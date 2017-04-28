// @flow
require('axios-debug-log');

import type { ActivityLevelOperation } from '../../../common/types';
import { path, find, prop, propEq } from 'ramda';
import axios from 'axios';
import config from '../../../common/config/index';

type SwapActivityAction = 'swop' | 'increase' | 'decrease';

const instance = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
});

const withToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getSkillAreas = (token: string) =>
  instance.get('/skill_areas', withToken(token)).then(path(['data']));

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

export const getActivities = (token: string, babyId: string) =>
  instance
    .get(`/babies/${babyId}/activities`, withToken(token))
    .then(path(['data']));

export const getFavoriteActivities = (token: string, babyId: string) =>
  instance
    .get(`/babies/${babyId}/activities/favourites`, withToken(token))
    .then(path(['data']));

export const getActivity = (token: string, id: string) => {
  return instance
    .get(`/activities/${id}`, withToken(token))
    .then(path(['data']));
};

export const getAllActivities = (token: string) => {
  return instance.get('/activities', withToken(token)).then(path(['data']));
};

export const swoopActivity = (
  token: string,
  babyId: string,
  activityId: string,
) => {
  return swapActivity(token, babyId, activityId, 'swop');
};

export const swapActivity = (
  token: string,
  babyId: string,
  activityId: string,
  action: SwapActivityAction,
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

export const getExperts = (token: string) =>
  instance.get('/experts', withToken(token)).then(path(['data']));

export const getExpert = (token: string, id: string) =>
  instance.get(`/experts/${id}`, withToken(token)).then(path(['data']));
