// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import BrowseArticles from './BrowseArticles';

export class BrowseArticlesScreen extends PureComponent {
  static navigationOptions = {
    title: 'Articles',
  };

  render() {
    return (
      <Screen>
        <BrowseArticles />
      </Screen>
    );
  }
}

export default BrowseArticlesScreen;
