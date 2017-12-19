// @flow
import type { Action } from 'web/types';

export const globalLoaderInit = (): Action => ({
  type: 'LOADING_REQUEST/REQUEST',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderSuccess = (): Action => ({
  type: 'LOADING_REQUEST/SUCCESS',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderError = (error: Error): Action => ({
  type: 'LOADING_REQUEST/ERROR',
  payload: {
    useGlobalLoader: 'useGlobalLoader',
    error,
  },
});
