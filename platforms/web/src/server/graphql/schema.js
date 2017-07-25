import { Core } from './core.graphqls';
import { Babies } from './babies.graphqls';
import { Activities } from './activities.graphqls';
import { Memories } from './memories.graphqls';
import { Experts } from './experts.graphqls';
import { Growth } from './growth.graphqls';
import { Content } from './content.graphqls';

const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const resolvers = require('./resolvers');
let enableMocks = false;
let mocks;

const typeDefs = [Core, Babies, Activities, Experts, Growth, Content, Memories];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers.default ? resolvers.default : resolvers,
});

if (typeof __DEV__ !== 'undefined') {
  const mocking = require('./mocks');
  mocks = mocking.default ? mocking.default : mocks;
}

if (enableMocks) {
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true,
  });
}

module.exports = { schema };
