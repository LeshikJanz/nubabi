// @flow
import type { NavigationProp } from 'core/types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Screen } from '../components';
import ViewMemory from './ViewMemory';

type Props = {
  navigation: NavigationProp,
};

export class ViewMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = ({ navigation }) => {
    const editMemory = () =>
      navigation.navigate('editMemory', {
        id: navigation.state.params.id,
        returnKey: navigation.state.params.returnKey,
      });

    return {
      title: 'Memory Details',
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={editMemory}>
          <Icon
            size={20}
            name="md-create"
            color="#454D56"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    };
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
