import { connectionFromPromisedArray } from './common';
import * as babiesConnector from '../connectors/babiesConnector';

export const resolvers = {
  Viewer: {
    allTips: (_, args, { token }) => {
      return connectionFromPromisedArray(babiesConnector.getTips(token), args);
    },

    allQuotes: (_, args, { token }) => {
      return connectionFromPromisedArray(
        babiesConnector.getQuotes(token),
        args,
      );
    },
  },
};

export default resolvers;
