require('axios-debug-log');

import { path, find, propEq } from 'ramda';
import axios from 'axios';
import config from '../../../common/config/index';

const instance = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
});

const withToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getSkillAreas = token =>
  instance.get('/skill_areas', withToken(token)).then(path(['data']));

export const getSkillArea = (token, id) => {
  return instance
    .get(`/skill_areas/${id}`, withToken(token))
    .then(path(['data']));
};

export const getActivities = (token, babyId) =>
  instance
    .get(`/babies/${babyId}/activities`, withToken(token))
    .then(path(['data']));

export const getActivity = (token, babyId, activityId) => {
  // FIXME: there's no API endpoint for this yet
  return getActivities(token, babyId).then(activities => {
    return find(propEq('id', parseInt(activityId, 10)))(activities);
  });
  /*
  return (
    instance.get(`/babies/${babyId}/activities/${activityId}`).
      then(path(['data']))
  );
  */
};

export const getExperts = token =>
  instance.get('/experts', withToken(token)).then(path(['data']));

export const getExpert = (token, id) =>
  instance.get(`/experts/${id}`, withToken(token)).then(path(['data']));
