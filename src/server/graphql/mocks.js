import faker from 'faker';
import { globalIdField } from './resolvers/common';

const mocks = {
  ID: (...args) => globalIdField().resolve(...args),
  Avatar: () => ({
    url: faker.image.avatar(),
    thumb: {
      url: faker.image.avatar(),
    },
  }),
  Expert: (_, args) => {
    if (args.id) {
      faker.seed(args.id);
    }
    const card = faker.helpers.userCard();

    return {
      name: card.name,
      discipline: faker.commerce.department(),
      avatar_url: faker.image.avatar(),
    };
  },
  AchievementConnection: () => ({
    count: faker.random.number(20),
  }),
  Baby: () => ({
    coverImage: { url: faker.image.people() },
  }),
  Memory: () => ({
    description: faker.lorem.sentence(),
    image: (_, { width = 30, height = 30 }) => ({
      url: () => faker.image.people(width, height),
      width: () => width,
      height: () => height,
    }),
  }),
  Badge: () => ({
    image: (_, { width = 30, height = 30 }) => ({
      url: () => faker.image.abstract(width, height),
      width,
      height,
    }),
  }),
};

export default mocks;
