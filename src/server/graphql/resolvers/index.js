import { merge } from 'lodash';
import rootResolvers from './core';
import babyResolvers from './babies';
import expertResolvers from './experts';
import contentResolvers from './content';

const resolvers = merge(
  rootResolvers,
  babyResolvers,
  expertResolvers,
  contentResolvers,
);

export default resolvers;
