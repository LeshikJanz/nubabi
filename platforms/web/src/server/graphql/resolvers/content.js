// @flow
import type { Context, ConnectionArguments, GraphQLContext } from './common';
import { path, curry } from 'ramda';
import moment from 'moment';
import readTime from 'reading-time';
import {
  prop,
  transform,
  connectionFromPromisedArray,
  globalIdField,
  fromGlobalId,
} from './common';
import * as connector from '../connectors/babiesConnector';

const readingTime = curry((propName, obj) => {
  return readTime(prop(propName)(obj));
});

export const resolvers = {
  Viewer: {
    allTips: (_: mixed, args: ConnectionArguments, { token }: Context) => {
      return connectionFromPromisedArray(connector.getTips(token), args);
    },
    allQuotes: (_: mixed, args: ConnectionArguments, { token }: Context) => {
      return connectionFromPromisedArray(connector.getQuotes(token), args);
    },
    allArticles: (
      obj: mixed,
      args: ConnectionArguments,
      { token }: GraphQLContext,
    ) => {
      return connectionFromPromisedArray(connector.getArticles(token), args);
    },
    article: (_, { id }: { id: string }, { token }: GraphQLContext) => {
      return connector.getArticle(token, fromGlobalId(id).id);
    },
    allLibraryArticles: (
      obj: mixed,
      args: ConnectionArguments,
      { token }: Context,
    ) => {
      return connectionFromPromisedArray(
        connector.getLibraryArticles(token, args),
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
  Article: {
    id: globalIdField(),
    text: prop('body'),
    summary: prop('description'),
    publishedAt: transform('publish_date', date => moment(date).toDate()),
    image: (obj: *) => {
      const image = path(['featured_image'], obj);
      if (!image) {
        return null;
      }

      return {
        url: `https:${path(['file', 'url'], image)}`,
        width: path(['file', 'details', 'image', 'width'], image),
        height: path(['file', 'details', 'image', 'height'], image),
      };
    },
    readingTime: readingTime('body'),
  },
  Author: {
    id: globalIdField(),
    avatar: (obj: any) => {
      const image = path(['image'], obj);

      if (!image) {
        return null;
      }

      return {
        url: `https:${path(['file', 'url'], image)}`,
        width: path(['file', 'details', 'image', 'width'], image),
        height: path(['file', 'details', 'image', 'height'], image),
      };
    },
  },
};

export default resolvers;
