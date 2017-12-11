// @flow
import { Action, ActivityConnection } from 'core/types';

export const globalLoaderInit = () => ({
  type: '/REQUEST',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderSuccess = () => ({
  type: '/SUCCESS',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderError = (error): Action => ({
  type: '/ERROR',
  payload: {
    useGlobalLoader: 'useGlobalLoader',
    error,
  },
});

export const refreshActivityList = (
  activities: ActivityConnection[],
): Action => ({
  type: 'REFRESH_ACTIVITY_LIST',
  payload: activities,
});
