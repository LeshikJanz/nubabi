import { Core } from './core.graphqls';
import { Babies } from './babies.graphqls';
import { Experts } from './experts.graphqls';

const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const resolvers = require('./resolvers');
const mocking = require('./mocks');

const typeDefs = [Core, Babies, Experts];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers.default ? resolvers.default : resolvers,
});

const enableMocks = false;
const mocks = mocking.default ? mocking.default : mocks;

if (enableMocks) {
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true,
  });
}


module.exports = { schema };
