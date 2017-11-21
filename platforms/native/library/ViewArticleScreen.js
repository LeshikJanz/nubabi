// @flow
import type { NavigationOptions } from 'core/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import ViewArticle from './ViewArticle';

export class ViewArticleScreen extends PureComponent {
  static navigationOptions: NavigationOptions = {
    title: 'Articles',
  };

  render() {
    return (
      <Screen>
        <ViewArticle id={this.props.navigation.state.params.id} />
      </Screen>
    );
  }
}

export default ViewArticleScreen;
