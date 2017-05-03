// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation';

import React, { PureComponent } from 'react';
import { Screen } from '../components';
import BabyNameTitle from '../profile/BabyNameTitle';
import Growth from './Growth';

type Props = {
  navigation: NavigationProp,
};

export class GrowthScreen extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: <BabyNameTitle />,
  };

  handleWhatYouNeedToKnow = () => {
    this.props.navigation.navigate('whatYouNeedToKnow');
  };

  handleDevelopmentRoadmap = () => {
    this.props.navigation.navigate('developmentRoadmap');
  };

  render() {
    return (
      <Screen>
        <Growth
          onNavigateToWhatYouNeedToKnow={this.handleWhatYouNeedToKnow}
          onNavigateToDevelopmentRoadmap={this.handleDevelopmentRoadmap}
        />
      </Screen>
    );
  }
}
export default GrowthScreen;
