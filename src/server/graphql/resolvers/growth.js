import {
  prop,
  transform,
  connectionFromArray,
  globalIdField,
  fromGlobalId,
} from './common';
import * as connector from '../connectors/babiesConnector';
import readingTime from 'reading-time';

export const resolvers = {
  Viewer: {
    growthArticle: async (
      _,
      { id, babyId },
      { token, connectors: { firebase } },
    ) => {
      const baby = await firebase.getBaby(fromGlobalId(babyId).id);
      return connector.getGrowthContentById(token, id, baby, firebase);
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
    parentingLinks: async (obj, args, { token, connectors: { firebase } }) => {
      const parentingLinks = prop('parenting_links')(obj);

      const content = parentingLinks
        ? await Promise.all(
            parentingLinks.map(tip => {
              return connector.getGrowthContentById(
                token,
                tip.id,
                obj.baby,
                firebase,
              );
            }),
          ).then(([...responses]) => responses)
        : [];

      return connectionFromArray(content, args);
    },
    faqLinks: async (obj, args, { token, connectors: { firebase } }) => {
      // TODO: remove duplication with parentingLinks
      const faqLinks = prop('faq_links')(obj);

      const content = faqLinks
        ? await Promise.all(
            faqLinks.map(tip => {
              return connector.getGrowthContentById(
                token,
                tip.id,
                obj.baby,
                firebase,
              );
            }),
          ).then(([...responses]) => responses)
        : [];

      return connectionFromArray(content, args);
    },
  },
  GrowthArticle: {
    readingTime: obj => {
      return readingTime(obj.text);
    },
  },
};

export default resolvers;
