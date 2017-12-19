// @flow
import formatPossessive from 'core/helpers/formatPossessive';
import type { ConnectionArguments } from '../resolvers/common';
import { fromGlobalId, getPaginationArguments } from '../resolvers/common';
import type {
  ActivityFilterInput,
  ActivityLevelOperation,
  Baby,
} from 'core/types';
import {
  find,
  merge,
  mergeDeepRight,
  path,
  prop,
  propEq,
  reduce,
  sortBy,
} from 'ramda';
import qs from 'qs';
import axios from 'axios';
import S from 'string';

type SwapActivityAction = 'swop' | 'increase' | 'decrease';
type CompleteActivityAction = 'completed';

const instance = axios.create({
  baseURL: process.env.NUBABI_API_URL,
  responseType: 'json',
});

const withToken = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const withPagination = (args: ConnectionArguments) => ({
  params: getPaginationArguments(args),
});

const withConfigs = (...configs) => {
  return reduce(mergeDeepRight, {}, configs);
};

const toParam = array => array && array.join(',');

const toIdsFilter = ids => {
  if (!ids) {
    return null;
  }
  return ids.map(id => fromGlobalId(id).id).join(',');
};

const toFilter = toParam;

const withActivityFilters = ({
  filter,
}: ConnectionArguments & ActivityFilterInput) => {
  if (!filter) {
    return {};
  }

  const { skillAreas, categories, ages } = filter;

  return {
    params: {
      filter: {
        skill_area_ids: toIdsFilter(skillAreas),
        category_ids: toIdsFilter(categories),
        ages: toFilter(ages),
      },
    },
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
  };
};

// TODO: API should be consistent with the other Activity filters
// ex: filter: { run_id: ID }
const withPeriodFilter = ({ filter }) => {
  if (!filter) {
    return {};
  }

  const { periodId } = filter;
  return {
    params: {
      filter: fromGlobalId(periodId).id,
    },
  };
};

const sortBySkillArea = sortBy(prop('skill_area_id'));

export const getSkillArea = (token: string, id: string) => {
  return instance
    .get(`/skill_areas/${id}`, withToken(token))
    .then(path(['data']));
};

export const getSkillAreaImage = (obj: mixed) => {
  const thumb = prop('thumbnail', obj);
  const large = prop('cover_image', obj);

  if (thumb || large) {
    const images = {};

    if (thumb) {
      images.thumb = { url: thumb };
    }

    if (large) {
      images.large = { url: large };
    }

    // default url to one image
    images.url = large || thumb;

    return images;
  }

  return null;
};

export const getActivities = (token: string, babyId: string, args = {}) => {
  return instance
    .get(
      `/babies/${babyId}/activities`,
      withConfigs(withToken(token), withPeriodFilter(args)),
    )
    .then(path(['data']))
    .then(activities => {
      // TODO: extra request since activities don't include `isCompleted`
      return getCompletedActivities(token, babyId).then(
        completedActivities => ({ activities, completedActivities }),
      );
    })
    .then(({ activities, completedActivities }) => {
      return activities.map(activity => {
        // Assign babyId so it can be used by activity introduction
        // Assign isCompleted
        return merge(activity, {
          babyId,
          isCompleted: !!completedActivities[activity.id],
        });
      });
    })
    .then(sortBySkillArea);
};

export const getFavoriteActivities = (token: string, babyId: string) =>
  instance
    .get(`/babies/${babyId}/activities/favourites`, withToken(token))
    .then(path(['data']))
    .then(sortBySkillArea);

export const isCompletedActivity = async (
  token: string,
  activityId: string,
  babyId: string,
) => {
  const completedActivities = await getCompletedActivities(token, babyId);
  return !!completedActivities[activityId];
};

export const isFavoriteActivity = async (
  token: string,
  activityId: string,
  babyId: string,
) => {
  const favoriteActivities = await getFavoriteActivities(token, babyId);
  return !!find(propEq('id', activityId), favoriteActivities);
};

export const getCompletedActivities = (token: string, babyId: string) => {
  return instance
    .get(`/babies/${babyId}/activities/completed`, withToken(token))
    .then(path(['data']))
    .then(completedActivities => {
      return completedActivities.reduce((acc, activity) => {
        acc[activity.activity_id] = true;
        return acc;
      }, {});
    });
};

export const getActivityHistory = (token: string, babyId: string) => {
  return instance
    .get(`/babies/${babyId}/history`, withToken(token))
    .then(path(['data']));
};

export const getActivity = (token: string, id: string, babyId: string) => {
  return instance
    .get(`/activities/${id}`, withToken(token))
    .then(response => ({ babyId, ...path(['data'], response) }));
};

export const getSteps = async (
  firebase,
  babyId: string,
  activityId: string,
  steps: Array<string>,
) => {
  const baby = await firebase.getBaby(babyId);
  const variables = await getTemplateVariables(firebase, baby);

  return steps.map(step => {
    return makeStringFromTemplate(step, variables);
  });
};

export const getAllActivities = (token: string, args?: ConnectionArguments) => {
  return instance
    .get(
      '/activities',
      withConfigs(
        withToken(token),
        withPagination(args),
        withActivityFilters(args),
      ),
    )
    .then(path(['data']));
};

export const swoopActivity = (
  token: string,
  babyId: string,
  activityId: string,
) => {
  return swapActivity(token, babyId, activityId, 'swop');
};

export const completeActivity = (
  token: string,
  babyId: string,
  activityId: string,
) => {
  return swapActivity(token, babyId, activityId, 'completed');
};

export const swapActivity = (
  token: string,
  babyId: string,
  activityId: string,
  action: SwapActivityAction | CompleteActivityAction,
) => {
  return instance
    .put(
      `/babies/${babyId}/activities/${activityId}?perform=${action}`,
      {},
      withToken(token),
    )
    .then(path(['data']));
};

export const changeActivityLevel = (
  token: string,
  babyId: string,
  activityId: string,
  level: ActivityLevelOperation,
) => {
  if (level === 'INCREASE') {
    return increaseActivityLevel(token, babyId, activityId);
  } else if (level === 'DECREASE') {
    return decreaseActivityLevel(token, babyId, activityId);
  }

  return null;
};

export const increaseActivityLevel = (
  token: string,
  babyId: string,
  activityId: string,
) => {
  return swapActivity(token, babyId, activityId, 'increase');
};

export const decreaseActivityLevel = (
  token: string,
  babyId: string,
  activityId: string,
) => {
  return swapActivity(token, babyId, activityId, 'decrease');
};

export const toggleActivityFavorite = (
  token: string,
  babyId: string,
  activityId: string,
  favorite: boolean,
) => {
  const url = `/babies/${babyId}/activities/${activityId}/favourite`;

  if (favorite) {
    return instance.post(url, {}, withToken(token)).then(path(['data']));
  }

  return instance.delete(url, withToken(token)).then(path(['data']));
};

export const getActivityIntroduction = async (
  firebase,
  babyId,
  introduction,
) => {
  return makeStringFromTemplate(
    introduction,
    await getTemplateVariables(firebase, await firebase.getBaby(babyId)),
  );
};

export const makeStringFromTemplate = (template: string, variables: *) => {
  const output = Object.keys(variables).reduce((acc, variable) => {
    return acc.replace(new RegExp(`{${variable}}`, 'g'), variables[variable]);
  }, template);

  return S(output.replace(/&nbsp;/g, ' '))
    .stripTags()
    .unescapeHTML()
    .toString();
};

export const getTemplateVariables = async (firebase, baby) => {
  const viewer = await firebase.getViewerWithProfile();
  const viewerName = viewer.firstName || viewer.email;

  return {
    baby: baby.name,
    name: viewerName,
    baby_possessive: formatPossessive(baby.name),
  };
};

export const getGrowthContent = (token: string, baby: Baby) => {
  // FIXME: filter
  return instance
    .get('/content/growth', withToken(token))
    .then(path(['data']))
    .then(data => {
      return data.map(content => {
        // HACK
        // eslint-disable-next-line no-param-reassign
        content.baby = baby;
        return content;
      });
    });
};

export const getGrowthContentById = async (
  token: string,
  id: string,
  baby: Baby,
  firebase,
) => {
  const variables = await getTemplateVariables(firebase, baby);
  return instance
    .get(`/content/library/${id}`, withToken(token))
    .then(path(['data']))
    .then(data => {
      const contentId = path(['id'], data);
      const title = path(['title'], data);
      const text = makeStringFromTemplate(path(['content'], data), variables);
      const section = prop('section', data);

      return {
        id: contentId,
        baby,
        title,
        text,
        section,
      };
    });
};

export const getIntroductionFor = (
  token: string,
  baby: Baby,
  viewerName: string,
) => {
  return instance
    .get('/content/growth/introduction', withToken(token))
    .then(path(['data', 'text']))
    .then(text =>
      makeStringFromTemplate(text, { name: viewerName, baby: baby.name }),
    );
};

export const getExperts = (token: string) =>
  instance.get('/experts', withToken(token)).then(path(['data']));

export const getExpert = (token: string, id: string) =>
  instance.get(`/experts/${id}`, withToken(token)).then(path(['data']));

export const getTips = (token: string) =>
  instance.get('/content/tips', withToken(token)).then(path(['data']));

export const getQuotes = (token: string) =>
  instance.get('/content/quotes', withToken(token)).then(path(['data']));

export const getCategories = (token: string) =>
  instance.get('/categories', withToken(token)).then(path(['data']));

export const getCategory = (token: string, id: string) =>
  instance.get(`/categories/${id}`, withToken(token)).then(path(['data']));

export const getCategoriesFor = (token: string, categoryIds: Array<string>) => {
  return Promise.all(categoryIds.map(id => getCategory(token, id))).then(
    ([...categories]) => categories,
  );
};

export const getArticles = (token: string) => {
  return instance
    .get('/content/articles', withToken(token))
    .then(path(['data']));
};

export const getArticle = (token: string, id: string) => {
  return instance
    .get(`/content/articles/${id}`, withToken(token))
    .then(path(['data']));
};

export const getLibraryArticles = (token: string, args: mixed) => {
  let filter = '';
  const sectionFilter = path(['filter', 'section'], args);

  if (sectionFilter) {
    filter = `?${qs.stringify({ section: sectionFilter })}`;
  }
  return instance
    .get(`/content/library${filter}`, withToken(token))
    .then(path(['data']));
};

export const getSkillAreas = (token: string) => {
  return instance.get('/skill_areas', withToken(token)).then(path(['data']));
};
