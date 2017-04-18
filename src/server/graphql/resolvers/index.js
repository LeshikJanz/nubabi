import { merge } from 'lodash';
import rootResolvers from './core';
import babyResolvers from './babies';
import expertResolvers from './experts';

const resolvers = merge(
  rootResolvers,
  babyResolvers,
  expertResolvers,
);

export default resolvers;
