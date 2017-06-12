// @flow
import type { NavigationProp, ActivityFilterInput } from 'react-navigation';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import BrowseActivities from './BrowseActivities';

type Props = {
  navigation: NavigationProp<*>,
};

type FilteredNavigationOptions = {
  title?: string,
  filter: ActivityFilterInput,
};

export class BrowseActivitiesScreen extends PureComponent {
  props: Props;
  static navigationOptions = {
    title: 'Activities',
  };

  handleBrowseAll = () => {
    this.props.navigation.navigate('browseActivitiesList', {
      title: 'All Activities',
    });
  };

  handleBrowseFiltered = ({ title, filter }: FilteredNavigationOptions) => {
    this.props.navigation.navigate('browseActivitiesList', { title, filter });
  };

  render() {
    return (
      <Screen>
        <BrowseActivities
          onBrowseAll={this.handleBrowseAll}
          onBrowseFiltered={this.handleBrowseFiltered}
        />
      </Screen>
    );
  }
}

export default BrowseActivitiesScreen;
