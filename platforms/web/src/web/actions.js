// @flow
import { Action } from 'core/types';

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

export const selectBaby = (babyId: string): Action => ({
  type: 'SELECT_BABY',
  payload: babyId,
});
