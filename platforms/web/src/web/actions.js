// @flow
import { Action } from 'core/types';

export const globalLoaderInit = () => ({
  type: 'LOADING_REQUEST/REQUEST',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderSuccess = () => ({
  type: 'LOADING_REQUEST/SUCCESS',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderError = (error): Action => ({
  type: 'LOADING_REQUEST/ERROR',
  payload: {
    useGlobalLoader: 'useGlobalLoader',
    error,
  },
});
