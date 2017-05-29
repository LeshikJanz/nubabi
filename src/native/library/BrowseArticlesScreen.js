// @flow
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import BrowseArticles from './BrowseArticles';

type Props = {
  navigation: NavigationProp<*, *>,
};
export class BrowseArticlesScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Articles',
  };

  handleViewArticle = (id: string) => {
    this.props.navigation.navigate('viewArticle', { id });
  };

  render() {
    return (
      <Screen>
        <BrowseArticles onViewArticle={this.handleViewArticle} />
      </Screen>
    );
  }
}

export default BrowseArticlesScreen;
