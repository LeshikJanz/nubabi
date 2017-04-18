import { omit, evolve } from 'ramda';
import { decode } from 'base-64';

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

function createOrUpdateBaby(firebase, values, id) {
  const creating = !id;

  const currentUserPath = `/users/${firebase.auth().currentUser.uid}`;

  const path = id
    ? `babies/${id}`
    : `babies/${firebase.database().ref().child('babies').push().key}`;

  const transforms = {
    dob: date => date.getTime(),
    gender: gender => {
      if (gender) {
        return gender === 'FEMALE' ? 'f' : 'm';
      }

      return null;
    },
  };

  const object = evolve(
    transforms,
    omit(['id', 'relationship', 'avatar', 'coverImage'], values),
  );

  if (creating) {
    object.createdAt = firebase.database.ServerValue.TIMESTAMP;
  } else {
    object.updatedAt = firebase.database.ServerValue.TIMESTAMP;
  }

  const promises = [
    firebase.database().ref().child(path).update(object),
    firebase
      .database()
      .ref()
      .child(path)
      .once('value')
      .then(returnValWithKeyAsId),
  ];

  const uploadFile = (refPath, dataUrl) =>
    new Promise((resolve, reject) => {
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
        error => reject(error),
        () => {
          ref
            .updateMetadata(metadata)
            .then(resolve(uploadTask.snapshot.downloadURL));
        },
      );
    });

  if (isNewImage(values.avatar)) {
    const { avatar: { url: content } } = values;
    promises.unshift(
      uploadFile(`${path}/avatar`, content).then(url => {
        return firebase
          .database()
          .ref()
          .child(path)
          .update({ avatar: { url } });
      }),
    );
  }

  if (isNewImage(values.coverImage)) {
    const { coverImage: { url: content } } = values;
    promises.unshift(
      uploadFile(`${path}/coverImage`, content).then(url => {
        return firebase
          .database()
          .ref()
          .child(path)
          .update({ coverImage: { url } });
      }),
    );
  }

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
}

const firebaseConnector = firebase => {
  return {
    firebase: () => firebase,
    get: path => {
      return firebase.database().ref(path).once('value').then(returnVal);
    },
    set: (path, values) => {
      return firebase.database().ref(path).set(values);
    },
    getViewer: () => {
      return firebase.auth().currentUser;
    },
    getBabies: () => {
      const currentUserId = firebase.auth().currentUser.uid;

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
        .then(([...babies]) => babies);
    },
    getBaby: id => {
      return firebase
        .database()
        .ref()
        .child(`/babies/${id}`)
        .once('value')
        .then(returnValWithKeyAsId);
    },
    getRelationship: id => {
      return firebase
        .database()
        .ref(`/users/${firebase.auth().currentUser.uid}/babies/${id}`)
        .once('value')
        .then(snap => snap.val());
    },
    createBaby: values => {
      return createOrUpdateBaby(firebase, values);
    },
    updateBaby: (id, values) => {
      return createOrUpdateBaby(firebase, values, id);
    },
  };
};

export default firebaseConnector;
