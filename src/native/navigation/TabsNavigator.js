// @flow
import type { NavigationOptions } from '../../common/types';
import React from 'react';
import { TabNavigator } from 'react-navigation';
import type { TabBarConfig } from 'react-navigation';
import { upperFirst } from 'lodash';
import theme from '../../common/themes/defaultTheme';
import NubabiIcon from '../../common/icons/nubabi';
import Stimulation from '../stimulation';
import Growth from '../growth/GrowthScreen';
import Profile from '../profile/Profile';
import Library from '../library/Library';
import Memories from '../memories/Memories';
import { getTabHeaders } from './shared';

const navigationOptions: NavigationOptions = ({
  navigation,
  navigationOptions: childOptions,
}) => ({
  title: upperFirst(navigation.state.key),
  headerMode: 'screen',
  headerVisible: true,
  headerStyle: {
    backgroundColor: theme.colors.white,
    shadowOpacity: 0.1,
    ...childOptions.headerStyle,
  },
  headerLeft: getTabHeaders(navigation.navigate).left,
  headerRight: getTabHeaders(navigation.navigate).right,
  tabBarIcon: ({ tintColor }: *) =>
    <NubabiIcon name={navigation.state.key} size={18} color={tintColor} />,
  tabBarLabel: upperFirst(navigation.state.routeName),
});

const TabsNavigator = TabNavigator(
  {
    stimulation: { screen: Stimulation },
    growth: { screen: Growth },
    library: { screen: Library },
    memories: { screen: Memories },
    profile: { screen: Profile },
  },
  {
    initialRouteName: 'profile',
    order: ['stimulation', 'growth', 'profile', 'library', 'memories'],
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        borderTopColor: '#e6e9f0',
        borderTopWidth: 1,
      },
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.gray,
    },
    navigationOptions,
  },
);

export default TabsNavigator;
