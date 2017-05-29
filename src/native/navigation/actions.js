import { NavigationActions } from 'react-navigation';

export const resetNavigation = (routeName, index = 0) =>
  NavigationActions.reset({
    index,
    actions: [NavigationActions.navigate({ routeName })],
  });

export const navigate = (routeName, params = {}) => {
  return NavigationActions.navigate({
    routeName,
    params,
    action: NavigationActions.navigate({ routeName, params }),
  });
};
