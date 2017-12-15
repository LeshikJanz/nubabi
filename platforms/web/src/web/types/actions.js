// @flow
import type { Baby } from 'core/types';

export type GlobalLoaderAction = {
  type: String,
  payload: {
    useGlobalLoader?: ?Object,
  },
};

export type LoginRequestAction = {
  type: 'auth/login/REQUEST',
  username: string,
  password: string,
};

export type LoginSuccessAction = {
  type: 'auth/login/SUCCESS',
  payload: {
    jwt: string,
    firstName: string,
    lastName: string,
    id: number,
  },
};

export type LogoutAction = {
  type: 'auth/logout',
};

export type FetchBabySuccessAction = {
  type: 'profile/FETCH_BABY_SUCCESS',
  payload: Baby,
};

export type FetchBabyFailureAction = {
  type: 'profile/FETCH_BABY_FAILURE',
  payload: Baby,
};

export type LoadJobRequestAction = {
  type: 'estimation/loadJob/REQUEST',
  jobNumber: number,
};

export type LoadJobSuccessAction = {
  type: 'estimation/loadJob/SUCCESS',
  payload: {
    id: number,
    name: string,
    description: string,
    date: string,
  },
};

export type LoadJobGridRequestAction = {
  type: 'estimation/loadJobGrid/REQUEST',
  payload: {
    jobNumber: number,
    useGlobalLoader?: boolean,
  },
};

export type LoadJobGridSuccessAction = {
  type: 'estimation/loadJobGrid/SUCCESS',
  payload: Array<Object>,
};

export type LoadPricingRequestAction = {
  type: 'estimation/loadPricing/REQUEST',
  payload: {
    jobNumber: number,
    useGlobalLoader?: boolean,
  },
};

export type LoadPricingSuccessAction = {
  type: 'estimation/loadPricing/SUCCESS',
  payload: Array<Object>,
};

export type Action =
  | LoginRequestAction
  | LoginSuccessAction
  | LogoutAction
  | LoadJobRequestAction
  | LoadJobSuccessAction
  | LoadJobGridRequestAction
  | LoadJobGridSuccessAction
  | LoadPricingRequestAction
  | LoadPricingSuccessAction;
