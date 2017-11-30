// @flow
import type { NavigationProp } from 'react-navigation/src/TypeDefinition';
import React, { PureComponent } from 'react';
import { Screen } from '../components/Screen';
import GraphDetail from './GraphDetail';

type Props = {
  navigation: NavigationProp<*>,
};
export class GraphDetailScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Growth',
  };

  render() {
    return (
      <Screen>
        <GraphDetail navigation={this.props.navigation} />
      </Screen>
    );
  }
}

export default GraphDetailScreen;
