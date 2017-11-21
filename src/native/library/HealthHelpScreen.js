// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import HealthHelp from './HealthHelp';
import { viewGrowthArticle } from './GrowthArticle';

export class HealthHelpScreen extends PureComponent {
  static navigationOptions = {
    title: 'Health Matters',
  };

  handleViewArticle = viewGrowthArticle.bind(this);

  render() {
    return (
      <Screen>
        <HealthHelp onViewArticle={this.handleViewArticle} />
      </Screen>
    );
  }
}

export default HealthHelpScreen;
