// @flow
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import type { NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import ViewGrowthArticle from './ViewGrowthArticle';

type Props = {
  navigation: NavigationProp<*, *>,
};

export class ViewGrowthArticleScreen extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Articles',
  };

  render() {
    return (
      <Screen>
        <ViewGrowthArticle id={this.props.navigation.state.params.id} />
      </Screen>
    );
  }
}

export default ViewGrowthArticleScreen;
