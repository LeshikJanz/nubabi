// @flow
import type {
  LinkAccountInput,
  MeasurementType,
  MeasurementUnit,
} from 'core/types';
import { getProviderClass } from 'core/auth/actions';
// noinspection ES6UnusedImports
import {
  fromGlobalId,
  sortByTimestamp,
  toTimestamp,
} from '../resolvers/common';
import R, {
  always,
  assoc,
  compose,
  cond,
  equals,
  evolve,
  map,
  merge,
  omit,
} from 'ramda';
import Task from 'data.task';
import { toCentimeters, toKilograms } from 'core/helpers/measurement';

const get = (firebase, path: string) =>
  firebase
    .database()
    .ref(path)
    .once('value')
    .then(returnVal);

const set = (firebase, path: string, values: mixed) =>
  firebase
    .database()
    .ref(path)
    .set(values);

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
  return evolve(transforms, omit(['id', 'relationship'], values));
};

const createOrUpdateBaby = async (firebase, values, id) => {
  const creating = !id;

  const currentUserId = getViewer(firebase).uid;
  const currentUserPath = `/users/${currentUserId}`;

  const babyId =
    id ||
    firebase
      .database()
      .ref()
      .child('babies')
      .push().key;
  const path = `babies/${babyId}`;

  const object = toFirebaseBaby(values);

  const { TIMESTAMP } = firebase.database.ServerValue;

  object[creating ? 'createdAt' : 'updatedAt'] = TIMESTAMP;

  if (creating) {
    object.createdBy = currentUserId;
  }

  // prettier-ignore
  await firebase.database()
    .ref()
    .child(path)
    .update(object);

  if (values.relationship) {
    await firebase
      .database()
      .ref()
      .child(`${currentUserPath}/${path}`)
      .set(values.relationship);
  }

  if (creating) {
    await recordMeasurement(firebase, babyId, 'weight', 'kg', values.weight);
    await recordMeasurement(firebase, babyId, 'height', 'cm', values.height);
  }

  return firebase
    .database()
    .ref()
    .child(path)
    .once('value')
    .then(returnValWithKeyAsId);
};

// Mark a baby as deleted, let Firebase functions handle the actual deletion and cleanup
const deleteBaby = async (firebase, id: string) => {
  const ref = firebase
    .database()
    .ref()
    .child(`/babies/${id}`);
  await ref.update({ wasDeleted: true });

  const baby = await ref.once('value').then(returnValWithKeyAsId);

  return { edge: { node: baby } };
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

const getUser = (firebase, userId: string) => get(firebase, `/users/${userId}`);

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

      // TODO: use getUser
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
  const user = evolve(transforms, input);
  const updates = {};

  Object.keys(user).forEach(key => {
    updates[`users/${currentUser.uid}/${key}`] = user[key];
  });

  await firebase
    .database()
    .ref()
    .update(updates);

  return getViewerWithProfile(firebase);
};

const inviteUser = async (firebase, input: InviteUserInput) => {
  const { inviteToken } = input;
  const friend = {
    id: inviteToken,
    ...omit(['id', 'inviteToken'], input),
  };

  const currentUserId = getViewer(firebase).uid;

  const updates = {};

  updates[`users/${currentUserId}/friends/${inviteToken}`] = friend;
  updates[`invites/${inviteToken}`] = {
    ...friend,
    invitedBy: currentUserId,
    invitedAt: firebase.database.ServerValue.TIMESTAMP,
  };

  await firebase
    .database()
    .ref()
    .update(updates);
  return friend;
};

const getLinkedAccounts = firebase => {
  return Promise.resolve(
    firebase.auth().currentUser.providerData.filter(provider => {
      return provider.providerId !== 'password';
    }),
  );
};

const linkAccount = async (firebase, input: LinkAccountInput) => {
  const { accessToken } = input;
  const provider = getProviderClass(input.providerId);
  if (!provider) {
    throw new Error('Unknown provider');
  }

  const credential = firebase.auth[provider].credential(accessToken);

  return firebase
    .auth()
    .currentUser.link(credential)
    .then(user => R.head(user.providerData));
};

const unlinkAccount = (firebase, input) => {
  const providerId = cond([
    [equals('FACEBOOK'), always('facebook.com')],
    [R.T, always(null)],
  ])(input.providerId);

  if (!providerId) {
    throw new Error('Unknown provider to unlink');
  }

  const deletedProvider = R.find(
    R.propEq('providerId', providerId),
    firebase.auth().currentUser.providerData,
  );

  return firebase
    .auth()
    .currentUser.unlink(providerId)
    .then(() => ({
      deletedEdge: { node: deletedProvider },
    }));
};

const getBabies = firebase => {
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
    .then(([...babies]) => {
      // TODO: do this with Firebase API if possible
      return R.filter(baby => baby.wasDeleted !== true, babies);
    })
    .catch(() => []);
};

const upsert = (basePath: string, obj: Object) => {
  const target = {};

  Object.keys(obj).forEach(key => {
    target[`${basePath}/${key}`] = obj[key];
  });

  return target;
};

const createMemory = (firebase, babyId: string, input: CreateMemoryInput) => {
  const updates = {};
  const currentUserId = getViewer(firebase).uid;
  const memoryId = firebase
    .database()
    .ref()
    .child('/memories/')
    .push().key;

  const files = {};
  if (input.files && input.files.length) {
    input.files.forEach(file => {
      const fileId = firebase
        .database()
        .ref()
        .child(`/memories/${memoryId}/files`)
        .push().key;
      files[fileId] = file;
    });
  }

  const memory = {
    ...omit(['babyId', 'files', 'fromActivity'], input),
    id: memoryId,
    babyId,
    authorId: currentUserId,
    createdAt: input.createdAt.getTime(),
    files,
  };

  if (input.fromActivity) {
    memory.fromActivityId = fromGlobalId(input.fromActivity).id;
  }

  updates[`/memories/${memoryId}`] = memory;
  updates[`/babies/${babyId}/memories/${memoryId}`] = true;

  return firebase
    .database()
    .ref()
    .update(updates)
    .then(() => get(firebase, `/memories/${memoryId}`));
};

const updateMemory = async (firebase, id: string, input: any) => {
  const toFirebaseMemory = {
    createdAt: toTimestamp,
  };

  const path = `/memories/${id}`;
  const memory = compose(
    assoc('updatedAt', firebase.database.ServerValue.TIMESTAMP),
    evolve(toFirebaseMemory),
    omit(['id', 'files', 'removeFiles']),
  )(input);

  const updates = {
    ...upsert(path, memory),
  };

  input.removeFiles.forEach((fileId: string) => {
    updates[`${path}/files/${fromGlobalId(fileId).id}`] = null;
  });

  if (input.files && input.files.length) {
    input.files.forEach(file => {
      const fileId = firebase
        .database()
        .ref()
        .child(`${path}/files/`)
        .push().key;
      updates[`${path}/files/${fileId}`] = file;
    });
  }

  await firebase
    .database()
    .ref()
    .update(updates);

  return get(firebase, path);
};

const deleteMemory = (firebase, memoryId: string) => {
  return new Task((reject, resolve) => {
    return get(firebase, `/memories/${memoryId}`)
      .then(resolve)
      .catch(reject);
  })
    .map(memory => {
      const updates = {};
      updates[`/memories/${memoryId}`] = null;
      updates[`/babies/${memory.babyId}/memories/${memoryId}`] = null;
      return { memory, updates };
    })
    .chain(({ memory, updates }) => {
      return new Task((reject, resolve) => {
        firebase
          .database()
          .ref()
          .update(updates)
          .then(() => resolve(memory))
          .catch(reject);
      });
    });
};

const toggleMemoryLike = (firebase, memoryId: string, isLiked: boolean) => {
  return new Task(async (reject, resolve) => {
    const currentUserId = getViewer(firebase).uid;
    const updates = {};
    updates[`/memories/${memoryId}/likes/${currentUserId}`] = isLiked
      ? true
      : null;
    updates[`/users/${currentUserId}/likes/memories/${memoryId}`] = isLiked
      ? true
      : null;

    try {
      await firebase
        .database()
        .ref()
        .update(updates);
      const memory = await get(firebase, `/memories/${memoryId}`);
      resolve(memory);
    } catch (err) {
      reject(err);
    }
  });
};

const isMemoryLikedByViewer = async (firebase, memoryId: string) => {
  try {
    const currentUserId = getViewer(firebase).uid;
    const like = await get(
      firebase,
      `/users/${currentUserId}/likes/memories/${memoryId}`,
    );
    return like !== null;
  } catch (err) {
    return null;
  }
};

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
  const measurementKey = firebase
    .database()
    .ref(measurementPrefix)
    .push().key;
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

  await firebase
    .database()
    .ref()
    .update(updates);
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

const denormalizeArray = (firebase, denormalizedPath, normalizedPath) => {
  return firebase
    .database()
    .ref()
    .child(denormalizedPath)
    .once('value')
    .then(snap => Object.keys(snap.val()))
    .then(ids =>
      Promise.all(
        ids.map(id => {
          return firebase
            .database()
            .ref()
            .child(`${normalizedPath}/${id}`)
            .once('value')
            .then(returnValWithKeyAsId);
        }),
      ),
    )
    .then(([...objs]) => objs)
    .catch(() => {
      return [];
    });
};

export const nestedArrayToArray = (input: Object) => {
  if (!input) {
    return [];
  }

  return Object.keys(input).map(key => assoc('id', key, input[key]));
};

const getMemories = (firebase, babyId: string) => {
  return denormalizeArray(
    firebase,
    `/babies/${babyId}/memories`,
    '/memories',
  ).then(compose(R.reverse, sortByTimestamp));
};

const getMemory = (firebase, id: string) => {
  return get(firebase, `/memories/${id}`);
};

const getMemoryLikes = async () => {};

const commentablePathFor = cond([[equals('MEMORY'), always('memories')]]);

const createComment = async (firebase, input) => {
  const currentUserId = getViewer(firebase).uid;
  const commentableId = fromGlobalId(input.id).id;
  const commentableType = input.commentableType.toUpperCase();
  const commentId = firebase
    .database()
    .ref()
    .child('comments')
    .push().key;

  const commentablePath = commentablePathFor(commentableType);

  const updates = {};
  updates[`/comments/${commentId}`] = merge(omit(['id'], input), {
    commentableId,
    id: commentId,
    authorId: currentUserId,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  });
  updates[`/${commentablePath}/${commentableId}/comments/${commentId}`] = true;

  try {
    await firebase
      .database()
      .ref()
      .update(updates);
  } catch (err) {
    return null;
  }

  return get(firebase, `/comments/${commentId}`);
};

const getRelationship = (firebase, id) => {
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
};

type CommentableTypes = 'MEMORY';

const getComments = (
  firebase,
  commentableType: CommentableTypes,
  commentableId: string,
) => {
  const prefix = commentablePathFor(commentableType);
  const commentablePath = `/${prefix}/${commentableId}/comments`;

  return denormalizeArray(firebase, commentablePath, '/comments').then(
    compose(R.reverse, sortByTimestamp),
  );
};

const getCommentable = (
  firebase,
  commentableType: CommentableTypes,
  commentableId: string,
) => {
  return get(
    firebase,
    `${commentablePathFor(commentableType)}/${commentableId}`,
  );
};

const firebaseConnector = firebase => {
  return {
    firebase: () => firebase,
    get: (path: string) => get(firebase, path),
    set: (path: string, values: mixed) => set(firebase, path, values),
    nestedArrayToArray: input => nestedArrayToArray(input),
    getViewer: () => getViewer(firebase),
    getViewerWithProfile: () => getViewerWithProfile(firebase),
    getUser: id => getUser(firebase, id),
    getFriends: () => getFriends(firebase),
    updateUser: input => updateUser(firebase, input),
    inviteUser: input => inviteUser(firebase, input),
    getLinkedAccounts: () => getLinkedAccounts(firebase),
    linkAccount: input => linkAccount(firebase, input),
    unlinkAccount: input => unlinkAccount(firebase, input),
    getBabies: () => getBabies(firebase),
    getBaby: (id: string) => getBaby(firebase, id),
    getRelationship: (id: string) => getRelationship(firebase, id),
    getBabyWeights: (id: string) => getBabyWeights(firebase, id),
    getBabyHeights: (id: string) => getBabyHeights(firebase, id),
    getMemories: (babyId, args) => getMemories(firebase, babyId, args),
    getMemory: id => getMemory(firebase, id),
    createBaby: (values: mixed) => createOrUpdateBaby(firebase, values),
    updateBaby: (id: string, values: mixed) =>
      createOrUpdateBaby(firebase, values, id),
    deleteBaby: (id: string) => deleteBaby(firebase, id),
    recordMeasurement: (
      id: string,
      type: MeasurementType,
      unit: MeasurementUnit,
      value: number,
    ) => recordMeasurement(firebase, id, type, unit, value),
    createMemory: (babyId, input) => createMemory(firebase, babyId, input),
    updateMemory: (id, input) => updateMemory(firebase, id, input),
    deleteMemory: id => deleteMemory(firebase, id),
    toggleMemoryLike: (memoryId, isLiked) =>
      toggleMemoryLike(firebase, memoryId, isLiked),
    isMemoryLikedByViewer: memoryId =>
      isMemoryLikedByViewer(firebase, memoryId),
    getMemoryLikes: memoryId => getMemoryLikes(firebase, memoryId),
    createComment: input => createComment(firebase, input),
    getComments: (commentableType, commentableId) =>
      getComments(firebase, commentableType, commentableId),
    getCommentable: (commentableType, commentableId) =>
      getCommentable(firebase, commentableType, commentableId),
  };
};

export default firebaseConnector;
