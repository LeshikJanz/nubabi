// @flow
import type { Context, ConnectionArguments } from './common';
import { connectionFromPromisedArray, globalIdField } from './common';
import * as babiesConnector from '../connectors/babiesConnector';

export const resolvers = {
  Viewer: {
    allTips: (_: mixed, args: ConnectionArguments, { token }: Context) => {
      return connectionFromPromisedArray(babiesConnector.getTips(token), args);
    },

    allQuotes: (_: mixed, args: ConnectionArguments, { token }: Context) => {
      return connectionFromPromisedArray(
        babiesConnector.getQuotes(token),
        args,
      );
    },
  },
  Quote: {
    id: globalIdField(),
  },
  Tip: {
    id: globalIdField(),
  },
};

export default resolvers;
