import faker from 'faker';
import { connectionFromArray, globalIdField } from './common';

const secureImage = str => str.replace('http:', 'https:');
const title = () => faker.company.catchPhrase();
const memories = [
  {
    id: '1',
    title: title(),
    description: faker.lorem.sentences(4),
    files: [
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/80/80/people/1/',
      },
      {
        contentType: 'video/mp4',
        url: 'https://firebasestorage.googleapis.com/v0/b/nubabitest1.appspot.com/o/lorem%2Florem.mp4?alt=media&token=cf51278c-2c45-473c-80c6-b43b00e4cf92',
      },
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/80/80/people/8/',
      },
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/80/80/people/9/',
      },
    ],
    comments: [],
  },
  {
    id: '2',
    title: title(),
    description: 'Daddy did something else',
    files: [
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/200/200/people/2/',
      },
    ],
    comments: [],
  },
  {
    id: '3',
    title: title(),
    description: 'Had a nice lunch',
    files: [
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/200/200/people/5/',
      },
    ],
    comments: [],
  },
  {
    id: '4',
    title: title(),
    description: 'This is another memory',
    files: [
      {
        contentType: 'image/jpeg',
        url: 'https://lorempixel.com/200/200/people/4',
      },
    ],
    comments: [],
  },
];

export const resolvers = {
  Baby: {
    memories: ({ id }, args) => {
      return connectionFromArray(memories, args);
    },
  },
  Memory: {
    id: globalIdField(),
    files: ({ files }, args) => {
      return connectionFromArray(files, args);
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
