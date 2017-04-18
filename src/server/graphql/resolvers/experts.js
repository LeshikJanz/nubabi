import {
  globalIdField,
  transform,
} from './common';

const resolvers = {
  Expert: {
    id: globalIdField(),
    avatar: transform('avatar_url', (url) => ({ url })),
  },
};
export default resolvers;
