import { merge } from 'lodash';
import rootResolvers from './core';
import babyResolvers from './babies';
import activityResolvers from './activities';
import growthResolvers from './growth';
import expertResolvers from './experts';
import contentResolvers from './content';

const resolvers = merge(
  rootResolvers,
  babyResolvers,
  activityResolvers,
  growthResolvers,
  expertResolvers,
  contentResolvers,
);

export default resolvers;
