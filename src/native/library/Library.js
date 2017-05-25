// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import ArticleList from './ArticleList';

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

  handleViewArticle = (id: string) => {};

  render() {
    return (
      <Screen>
        <Box flex={1}>
          <ArticleList
            onBrowseAll={this.handleBrowseArticles}
            onViewArticle={this.handleViewArticle}
          />
          <Box flex={1} />
          <Box flex={1} />
        </Box>
      </Screen>
    );
  }
}

export default Library;
