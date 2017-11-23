// @flow
import { push, replace } from 'react-router-redux';

export const resetNavigation = (routeName: string) => {
  return replace(routeName);
};

export const navigate = (routeName: string) => {
  return push(routeName);
};
