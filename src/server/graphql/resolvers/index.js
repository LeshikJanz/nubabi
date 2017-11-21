// @flow
import { combineResolvers } from './common';
import rootResolvers from './core';
import babyResolvers from './babies';
import activityResolvers from './activities';
import growthResolvers from './growth';
import expertResolvers from './experts';
import contentResolvers from './content';
import memoryResolvers from './memories';

const resolvers = combineResolvers(
  rootResolvers,
  babyResolvers,
  activityResolvers,
  growthResolvers,
  expertResolvers,
  contentResolvers,
  memoryResolvers,
);

export default resolvers;
