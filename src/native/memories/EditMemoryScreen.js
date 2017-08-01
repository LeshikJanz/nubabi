// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import EditMemory from './EditMemory';

type Props = {
  navigation: NavigationProp,
};

export class EditMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Edit Memory',
  };

  handleAddVoiceNote = () => {
    const id = this.props.navigation.state.params.id;
    this.props.navigation.navigate('voiceRecording', { id });
  };

  render() {
    const id = this.props.navigation.state.params.id;

    return (
      <Screen>
        <EditMemory id={id} onAddVoiceNote={this.handleAddVoiceNote} />
      </Screen>
    );
  }
}

export default EditMemoryScreen;
