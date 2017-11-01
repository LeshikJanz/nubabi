import { head } from 'ramda';
import {
  prop,
  transform,
  connectionFromArray,
  globalIdField,
  fromGlobalId,
} from './common';
import * as connector from '../connectors/babiesConnector';
import readingTime from 'reading-time';

const getContentLinks = async (links, baby, token, firebase, args) => {
  const content = links
    ? await Promise.all(
        links.map(link => {
          return connector.getGrowthContentById(token, link.id, baby, firebase);
        }),
      ).then(([...responses]) => responses)
    : [];

  return connectionFromArray(content, args);
};

export const resolvers = {
  Viewer: {
    growthArticle: async (
      _,
      { id, babyId },
      { token, connectors: { firebase } },
    ) => {
      const baby = await firebase.getBaby(fromGlobalId(babyId).id);
      const articleId = fromGlobalId(id).id;
      return connector.getGrowthContentById(token, articleId, baby, firebase);
    },
  },
  Growth: {
    id: globalIdField(),
    minimumAge: prop('age_min'),
    maximumAge: prop('age_max'),
    ageDuration: transform('age_duration', duration => duration.toUpperCase()),
    // TODO: extract method
    content: async (obj, _, { connectors: { firebase } }) => {
      const template = prop('growth_development')(obj);

      return connector.makeStringFromTemplate(
        template,
        await connector.getTemplateVariables(firebase, obj.baby),
      );
    },
    introduction: async (obj, _, { connectors: { firebase } }) => {
      const template = obj.introduction;

      return connector.makeStringFromTemplate(
        template,
        await connector.getTemplateVariables(firebase, obj.baby),
      );
    },
    expert: (obj, _, { token }) => {
      return connector.getExpert(token, prop('expert_id')(obj));
    },
    growthDevelopmentContentLinks: async (
      obj,
      args,
      { token, connectors: { firebase } },
    ) => {
      return await getContentLinks(
        prop('growth_development_content_links')(obj),
        obj.baby,
        token,
        firebase,
        args,
      );
    },
    introductionContentLinks: async (
      obj,
      args,
      { token, connectors: { firebase } },
    ) => {
      return await getContentLinks(
        prop('introduction_content_links')(obj),
        obj.baby,
        token,
        firebase,
        args,
      );
    },
  },
  GrowthArticle: {
    id: globalIdField(),
    readingTime: obj => {
      return readingTime(obj.text);
    },
    section: ({ section }) => head(section),
  },
  GrowthArticleSection: {
    id: globalIdField(),
  },
};

export default resolvers;
