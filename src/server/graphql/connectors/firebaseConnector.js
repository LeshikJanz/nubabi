// @flow
import type { MeasurementType, MeasurementUnit } from '../../../common/types';
import { omit, evolve } from 'ramda';
import { decode } from 'base-64';
import {
  toCentimeters,
  toKilograms,
} from '../../../common/helpers/measurement';

const returnVal = snapshot => snapshot.val();
const returnValWithKeyAsId = snapshot => {
  if (!snapshot.val()) {
    return null;
  }

  return {
    id: snapshot.key,
    ...snapshot.val(),
  };
};

const isNewImage = image => {
  // Apparently we can't use String.prototype.startsWith on JSC
  return image && image.url.indexOf('data:') !== -1;
};

const transforms = {
  dob: date => date.getTime(),
  gender: gender => {
    if (gender) {
      return gender === 'FEMALE' ? 'f' : 'm';
    }

    return null;
  },
};

const toFirebaseBaby = values => {
  return evolve(
    transforms,
    omit(['id', 'relationship', 'avatar', 'coverImage'], values),
  );
};

const uploadFile = (firebase, refPath, dataUrl) => {
  return new Promise((resolve, reject) => {
    /*
     * We can't use data_url with putSring since Firebase is unconditionally
     * using `atob` which fails on RN when run on JSC.
     */
    /* eslint-disable no-useless-escape */
    const dataUrlRegExp = new RegExp(
      /data:([\w\/\+]+);(charset=[\w-]+|base64).*,([a-zA-Z0-9+\/]+={0,2})/g,
    );
    /* eslint-enable no-useless-escape */

    // data_url is in format data:image/jpeg;base64,<content>
    const match = dataUrlRegExp.exec(dataUrl);
    const contentType = match[1];

    const content = new Uint8Array(
      decode(match[3]).split('').map(c => c.charCodeAt(0)),
    );

    const metadata = { contentType };
    const ref = firebase.storage().ref().child(refPath);
    const uploadTask = ref.put(content);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        /* progress */
      },
      error => {
        console.log(error);
        reject(error);
      },
      () => {
        ref
          .updateMetadata(metadata)
          .then(resolve(uploadTask.snapshot.downloadURL));
      },
    );
  });
};

const createOrUpdateBaby = (firebase, values, id) => {
  const creating = !id;

  const currentUserPath = `/users/${getViewer(firebase).uid}`;

  const path = id
    ? `babies/${id}`
    : `babies/${firebase.database().ref().child('babies').push().key}`;

  const object = toFirebaseBaby(values);

  const { TIMESTAMP } = firebase.database.ServerValue;

  object[creating ? 'createdAt' : 'updatedAt'] = TIMESTAMP;

  const promises = [
    firebase.database().ref().child(path).update(object),
    firebase
      .database()
      .ref()
      .child(path)
      .once('value')
      .then(returnValWithKeyAsId),
  ];

  const images = ['avatar', 'coverImage'];

  images.forEach(key => {
    if (isNewImage(values[key])) {
      const content = values[key].url;
      promises.unshift(
        uploadFile(firebase, `${path}/${key}`, content).then(url => {
          return firebase
            .database()
            .ref()
            .child(path)
            .update({ [key]: { url } });
        }),
      );
    }
  });

  // TODO: firebase throws permission denied at / for some reason
  // so we're doing this manually, and not updating relation yet

  // const updates = {};
  // updates[path] = object;
  //
  // if (values.relationship) {
  //   updates[`users/${firebase.auth().currentUser.uid}/${path}`] = values.relationship;
  // }
  //
  // return firebase.database().ref().update(updates)
  if (values.relationship) {
    promises.unshift(
      firebase
        .database()
        .ref()
        .child(`${currentUserPath}/${path}`)
        .set(values.relationship),
    );
  }

  return Promise.all(promises).then(
    responses => responses[responses.length - 1],
  );
};

const getViewer = firebase => firebase.auth().currentUser;

const get = (firebase, path: string) =>
  firebase.database().ref(path).once('value').then(returnVal);

const set = (firebase, path: string, values: mixed) =>
  firebase.database().ref(path).set(values);

const getBaby = (firebase, id) => {
  return firebase
    .database()
    .ref()
    .child(`/babies/${id}`)
    .once('value')
    .then(returnValWithKeyAsId);
};

const recordMeasurement = async (firebase, babyId, type, unit, value) => {
  // TODO: this is currently stored in Firebase, which isn't particularly
  // good for historical data. We might consider a separate datastore for
  // this, probably BigQuery if we wish to stay in the Google ecosystem

  const suffix = type === 'weight' ? 'weights' : 'heights';
  const measurementPrefix = `/measurements/${babyId}/${suffix}`;
  const measurementKey = firebase.database().ref(measurementPrefix).push().key;
  const measurementPath = [measurementPrefix, measurementKey].join('/');

  let rawValue = value;

  if (type === 'weight' && unit !== 'kg') {
    rawValue = toKilograms(value);
  } else if (type === 'height' && unit !== 'cm') {
    rawValue = toCentimeters(value);
  }

  const updates = {};
  updates[`/babies/${babyId}/${type}`] = rawValue;

  updates[measurementPath] = {
    value: rawValue,
    recordedAt: firebase.database.ServerValue,
  };

  await firebase.database().ref().update(updates);
  const baby = await getBaby(firebase, babyId);

  const measurement = await get(firebase, measurementPath);

  return {
    baby,
    recordedMeasurement: {
      value: measurement.value,
      unit: type === 'weight' ? 'kg' : 'cm',
      recordedAt: new Date(measurement.recordedAt.TIMESTAMP),
    },
  };
};

const firebaseConnector = firebase => {
  return {
    firebase: () => firebase,
    get: (path: string) => get(firebase, path),
    set: (path: string, values: mixed) => set(firebase, path, values),
    getViewer: () => getViewer(firebase),
    getBabies: () => {
      const currentUserId = getViewer(firebase).uid;

      return firebase
        .database()
        .ref()
        .child(`/users/${currentUserId}/babies`)
        .once('value')
        .then(snap => Object.keys(snap.val()))
        .then(babyIds =>
          Promise.all(
            babyIds.map(babyId => {
              return firebase
                .database()
                .ref()
                .child(`/babies/${babyId}`)
                .once('value')
                .then(returnValWithKeyAsId);
            }),
          ))
        .then(([...babies]) => babies)
        .catch(err => {
          console.warn(err);
          return [];
        });
    },
    getBaby: (id: string) => {
      return getBaby(firebase, id);
    },
    getRelationship: (id: string) => {
      return firebase
        .database()
        .ref(`/users/${getViewer(firebase).uid}/babies/${id}`)
        .once('value')
        .then(returnVal);
    },
    createBaby: (values: mixed) => {
      return createOrUpdateBaby(firebase, values);
    },
    updateBaby: (id: string, values: mixed) => {
      return createOrUpdateBaby(firebase, values, id);
    },
    recordMeasurement: (
      id: string,
      type: MeasurementType,
      unit: MeasurementUnit,
      value: number,
    ) => {
      return recordMeasurement(firebase, id, type, unit, value);
    },
  };
};

export default firebaseConnector;
