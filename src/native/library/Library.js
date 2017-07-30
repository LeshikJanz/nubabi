// @flow
import type { NavigationProp, NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import ArticleList from './ArticleCardList';
import HealthHelpButton from './HealthHelpButton';
import ParentingTipsButton from './ParentingTipsButton';

type Props = {
  navigation: NavigationProp,
};

export class Library extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Library',
  };

  handleBrowseArticles = () => {
    this.props.navigation.navigate('browseArticles');
  };

  handleViewArticle = (id: string) => {
    this.props.navigation.navigate('viewArticle', { id });
  };

  handleHealthHelp = () => {
    this.props.navigation.navigate('healthHelp');
  };

  handleParentingTips = () => {
    this.props.navigation.navigate('parentingTips');
  };

  render() {
    return (
      <Screen>
        <Box flex={1}>
          <ArticleList
            onBrowseAll={this.handleBrowseArticles}
            onViewArticle={this.handleViewArticle}
          />
          <Box flex={1} contentSpacing>
            <ParentingTipsButton onPress={this.handleParentingTips} />
          </Box>
          <Box flex={1} contentSpacing>
            <HealthHelpButton onPress={this.handleHealthHelp} />
          </Box>
        </Box>
      </Screen>
    );
  }
}

export default Library;
