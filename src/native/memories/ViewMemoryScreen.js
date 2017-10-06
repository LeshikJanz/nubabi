// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import ViewMemory from './ViewMemory';

type Props = {
  navigation: NavigationProp,
};
export class ViewMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Memory Details',
  };

  render() {
    return (
      <Screen>
        <Box flex={1} style={() => ({ marginTop: 9 })}>
          <ViewMemory id={this.props.navigation.state.params.id} />
        </Box>
      </Screen>
    );
  }
}

export default ViewMemoryScreen;
