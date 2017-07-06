// @flow
import type { MeasurementType, MeasurementUnit } from '../../../common/types';
import R, { omit, evolve, map, compose } from 'ramda';
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
  // TODO: confirm
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

const createOrUpdateBaby = async (firebase, values, id) => {
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
const getViewerWithProfile = async firebase => {
  const user = getViewer(firebase);
  if (!user) {
    return null;
  }

  const profile = await firebase
    .database()
    .ref(`/users/${user.uid}`)
    .once('value')
    .then(returnVal);

  return {
    ...profile,
    email: user.email,
    uid: user.uid,
  };
};

const getFriends = async firebase => {
  const user = getViewer(firebase);
  return firebase
    .database()
    .ref(`/users/${user.uid}/friends`)
    .once('value')
    .then(returnVal)
    .then(async data => {
      if (!data) {
        return [];
      }

      const getFriend = async (friend, key) => {
        if (typeof friend !== 'object') {
          const record = await firebase
            .database()
            .ref(`/users/${key}`)
            .once('value')
            .then(returnVal);
          const relationship = friend; // we store the relationship instead of a boolean

          return {
            ...record,
            relationship,
            isPending: false,
          };
        }

        return {
          ...friend,
          isPending: true,
          id: key,
        };
      };

      return Promise.all(
        Object.keys(data).map(key => {
          return getFriend(data[key], key);
        }),
      ).then(R.sortBy(R.prop('isPending')));
    });
};

const updateUser = async (firebase, input) => {
  const currentUser = getViewer(firebase);
  const user = evolve(transforms, omit(['avatar'], input));
  const updates = {};

  Object.keys(user).forEach(key => {
    updates[`users/${currentUser.uid}/${key}`] = user[key];
  });

  if (isNewImage(input.avatar)) {
    const avatarUrl = await uploadFile(
      firebase,
      `users/${currentUser.uid}/avatar`,
      input.avatar.url,
    );
    if (avatarUrl) {
      updates[`users/${currentUser.uid}/avatar/url`] = avatarUrl;
    }
  }

  await firebase.database().ref().update(updates);

  return getViewerWithProfile(firebase);
};

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

const assignIdsToCollection = R.mapObjIndexed((value, key) => {
  return R.assoc('id', key, value);
});

const timestampToDate = val => new Date(val.TIMESTAMP);

const evolveBabyMeasurement = type => {
  return R.compose(
    R.assoc('unit', type === 'weights' ? 'kg' : 'cm'),
    R.evolve({
      recordedAt: timestampToDate,
    }),
  );
};

const getBabyMeasurements = (
  firebase,
  id: string,
  type: 'weights' | 'heights',
) => {
  return firebase
    .database()
    .ref()
    .child(`/measurements/${id}/${type}`)
    .once('value')
    .then(
      compose(
        map(evolveBabyMeasurement(type)),
        R.values,
        assignIdsToCollection,
        returnVal,
      ),
    );
};

const getBabyWeights = (firebase, id: string) => {
  return getBabyMeasurements(firebase, id, 'weights');
};

const getBabyHeights = (firebase, id: string) => {
  return getBabyMeasurements(firebase, id, 'heights');
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
    getViewerWithProfile: () => getViewerWithProfile(firebase),
    getFriends: () => getFriends(firebase),
    updateUser: input => updateUser(firebase, input),
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
          ),
        )
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
        .then(returnVal)
        .then(val => {
          // To ease migration, will be removed
          const validRelationships = [
            'Parent',
            'Grandparent',
            'Guardian',
            'Relative',
            'Nanny',
            'AuPair',
            'Other',
          ];

          if (!validRelationships.includes(val)) {
            return 'Other';
          }

          return val;
        });
    },
    getBabyWeights: (id: string) => getBabyWeights(firebase, id),
    getBabyHeights: (id: string) => getBabyHeights(firebase, id),
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
