// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { Screen, withCurrentBabyRequired } from '../components';
import Growth from './Growth';

type Props = {
  navigation: NavigationProp,
};

export class GrowthScreen extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Growth',
  };

  handleWhatYouNeedToKnow = () => {
    this.props.navigation.navigate('whatYouNeedToKnow');
  };

  handleDevelopmentRoadmap = () => {
    this.props.navigation.navigate('developmentRoadmap');
  };

  handleGraphDetail = () => {
    this.props.navigation.navigate('graphDetail');
  };

  render() {
    return (
      <Screen>
        <Growth
          onNavigateToWhatYouNeedToKnow={this.handleWhatYouNeedToKnow}
          onNavigateToDevelopmentRoadmap={this.handleDevelopmentRoadmap}
          onNavigateToGraphDetail={this.handleGraphDetail}
        />
      </Screen>
    );
  }
}
export default compose(withCurrentBabyRequired)(GrowthScreen);
