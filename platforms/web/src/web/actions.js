// @flow
import type { Action } from 'web/types';

export const globalLoaderInit = (): Action => ({
  type: 'loading/REQUEST',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderSuccess = (): Action => ({
  type: 'loading/SUCCESS',
  payload: { useGlobalLoader: 'useGlobalLoader' },
});

export const globalLoaderError = (error: Error): Action => ({
  type: 'loading/ERROR',
  payload: {
    useGlobalLoader: 'useGlobalLoader',
    error,
  },
});
