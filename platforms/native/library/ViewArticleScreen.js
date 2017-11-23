// @flow
import type { NavigationOptions } from 'core/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import ViewArticle from './ViewArticle';

type Props = {
  navigation: NavigationProp,
};

export class ViewArticleScreen extends PureComponent<Props> {
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
