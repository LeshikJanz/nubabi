// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import ParentingTips from './ParentingTips';
import { viewGrowthArticle } from './GrowthArticle';

export class ParentingTipsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Parenting Tips',
  };

  handleViewArticle = viewGrowthArticle.bind(this);

  render() {
    return (
      <Screen>
        <ParentingTips onViewArticle={this.handleViewArticle} />
      </Screen>
    );
  }
}

export default ParentingTipsScreen;
