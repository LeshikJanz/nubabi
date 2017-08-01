// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import AddMemory from './AddMemory';

type Props = {
  navigation: NavigationProp,
};

export class AddMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Add memory',
  };

  handleAddVoiceNote = () => {
    this.props.navigation.navigate('voiceRecording');
  };

  render() {
    return (
      <Screen>
        <AddMemory onAddVoiceNote={this.handleAddVoiceNote} />
      </Screen>
    );
  }
}

export default AddMemoryScreen;
