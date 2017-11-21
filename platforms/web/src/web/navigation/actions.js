// @flow
import { push, replace } from 'react-router-redux';

export const resetNavigation = (routeName: string, index?: number = 0) => {
  return replace(routeName);
};

export const navigate = (routeName: string, params: Object = {}) => {
  return push(routeName);
};
