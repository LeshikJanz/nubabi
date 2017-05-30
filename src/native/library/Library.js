// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import ArticleList from './ArticleList';
import HealthHelpButton from './HealthHelpButton';
import ParentingTipsButton from './ParentingTipsButton';

type Props = {
  navigation: NavigationProp<*, *>,
};

class Library extends PureComponent {
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

  handleHealthHelp = () => {};
  handleParentingTips = () => {};

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
