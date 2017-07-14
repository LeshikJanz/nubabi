import { map, identity, find, propEq, sortBy, prop, reverse } from 'ramda';
import faker from 'faker';
import {
  connectionFromArray,
  globalIdField,
  fromGlobalId,
  connectionFromPromisedArrayWithCount,
  toDate,
  transform,
} from './common';

const sortByTimestamp = sortBy(prop('createdAt'));
const secureImage = str => str.replace('http:', 'https:') + '/';
const title = () => faker.company.catchPhrase();

const randomArray = (low: number, high: number, mapFn: Function = identity) => {
  return map(
    mapFn,
    new Array(Math.floor(Math.random() * (high - low + 1) + low)),
  );
};

const makeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
});

const makeComment = index => ({
  id: faker.random.uuid(),
  text: faker.lorem.sentences(),
  author: makeUser(),
  createdAt: faker.date.past(),
});

const makeFile = () => ({
  contentType: faker.random.arrayElement([
    'image/jpeg',
    'image/png',
    'video/mp4',
  ]),
  url: secureImage(faker.image.people()),
});

const mockComments = reverse(sortByTimestamp(randomArray(0, 10, makeComment)));

export const resolvers = {
  Baby: {
    memories: ({ id }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        firebase.getMemories(id),
        args,
      );
    },
    memory: (_, { id }, { connectors: { firebase } }) => {
      return firebase.getMemory(fromGlobalId(id).id);
    },
  },
  Memory: {
    id: globalIdField(),
    files: ({ files }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(firebase.nestedArrayToArray(files)),
        args,
      );
    },
    comments: ({ comments }, args) => {
      // TODO
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(mockComments),
        args,
      );
    },
    createdAt: transform('createdAt', toDate),
    author: ({ authorId }, _, { connectors: { firebase } }) => {
      return firebase.getUser(authorId);
    },
  },
};

export default resolvers;
