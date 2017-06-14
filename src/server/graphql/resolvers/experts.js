// flow
import type { Context, ConnectionArguments } from './common';
import {
  globalIdField,
  transform,
  connectionFromPromisedArray,
} from './common';
import * as connector from '../connectors/babiesConnector';

const resolvers = {
  Viewer: {
    allExperts: (_: mixed, args: ConnectionArguments, { token }: Context) =>
      connectionFromPromisedArray(connector.getExperts(token), args),
  },
  Expert: {
    id: globalIdField(),
    avatar: transform('avatar_url', url => ({ url })),
  },
};

export default resolvers;
