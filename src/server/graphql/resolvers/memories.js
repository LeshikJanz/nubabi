import { map, identity } from 'ramda';
import faker from 'faker';
import {
  connectionFromArray,
  globalIdField,
  connectionFromPromisedArrayWithCount,
} from './common';

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

const makeMemory = () => ({
  id: faker.random.uuid(),
  title: faker.company.catchPhrase(),
  description: faker.lorem.sentences(4),
  files: randomArray(1, 10, makeFile),
  comments: randomArray(0, 10, makeComment),
});

const memories = randomArray(1, 10, makeMemory);

export const resolvers = {
  Baby: {
    memories: ({ id }, args) => {
      return connectionFromArray(memories, args);
    },
  },
  Viewer: {
    memories: (_, args) => connectionFromArray(memories, args),
  },
  Memory: {
    id: globalIdField(),
    files: ({ files }, args) => {
      return connectionFromPromisedArrayWithCount(Promise.resolve(files), args);
    },
    comments: ({ comments }, args) => {
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(comments),
        args,
      );
    },
    // TODO: remove all these mock resolvers
    createdAt: () => faker.date.past(),
    author: () => {
      // TODO: remove
      return {
        id: '1',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: `https://lorempixel.com/30/30/people/${Math.floor(Math.random() * 10 + 1)}/`,
      };
    },
  },
};

export default resolvers;
