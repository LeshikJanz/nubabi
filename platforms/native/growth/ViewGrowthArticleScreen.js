// @flow
import type { NavigationOptionsGetter } from 'core/types';
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { path } from 'ramda';
import { Screen } from '../components';
import ViewGrowthArticle from './ViewGrowthArticle';
import { getSectionTitle } from './SectionLinks';

type Props = {
  navigation: NavigationProp<*, *>,
};

export class ViewGrowthArticleScreen extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptionsGetter = ({ navigation }) => ({
    title: getSectionTitle(path(['state', 'params', 'section'], navigation)),
  });

  render() {
    return (
      <Screen>
        <ViewGrowthArticle id={this.props.navigation.state.params.id} />
      </Screen>
    );
  }
}

export default ViewGrowthArticleScreen;
