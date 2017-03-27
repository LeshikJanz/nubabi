// @flow
import React from 'react';
import { TabNavigator } from 'react-navigation';
import type { TabBarConfig } from 'react-navigation';
import { upperFirst } from 'lodash';
import theme from '../../common/themes/defaultTheme';
import NubabiIcon from '../../common/icons/nubabi';
import Stimulation from '../stimulation';
import Growth from '../growth';
import Profile from '../profile';
import Library from '../library';
import Memories from '../memories';
import { getTabHeaders } from './shared';

const TabsNavigator = TabNavigator({
  stimulation: { screen: Stimulation },
  growth: { screen: Growth },
  library: { screen: Library },
  memories: { screen: Memories },
  profile: { screen: Profile },
}, {
  initialRouteName: 'profile',
  order: [
    'stimulation',
    'growth',
    'profile',
    'library',
    'memories',
  ],
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
      borderTopColor: '#e6e9f0',
      borderTopWidth: 1,
    },
    activeTintColor: theme.colors.primary,
  },

  navigationOptions: {
    title: navigation => upperFirst(navigation.state.key),
    tabBar: ({ state }) => ({
      icon: ({ tintColor }: TabBarConfig) => (
        <NubabiIcon name={state.key} size={18} color={tintColor} />
      ),
      label: upperFirst(state.routeName),
    }),
    headerMode: 'float',
    header: ({ navigate }) => ({
      ...getTabHeaders(navigate),
      style: {
        backgroundColor: theme.colors.white,
      },
    }),
  },
});

export default TabsNavigator;
