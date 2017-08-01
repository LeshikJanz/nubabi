// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import VoiceNoteRecording from './VoiceNoteRecording';

type Props = {
  navigation: NavigationProp,
};
export class VoiceRecordingScreen extends PureComponent {
  static navigationOptions = {
    title: 'Voice Note',
  };

  render() {
    const memoryId = this.props.navigation.state.params.id;

    return (
      <Screen>
        <VoiceNoteRecording memoryId={memoryId} />
      </Screen>
    );
  }
}

export default VoiceRecordingScreen;
