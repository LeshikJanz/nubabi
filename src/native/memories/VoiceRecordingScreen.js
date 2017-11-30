// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { path } from 'ramda';
import { Screen } from '../components';
import VoiceNoteRecording from './VoiceNoteRecording';

type Props = {
  navigation: NavigationProp,
};
export class VoiceRecordingScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Voice Note',
  };

  render() {
    const memoryId = path(['state', 'params', 'id'], this.props.navigation);

    return (
      <Screen>
        <VoiceNoteRecording
          memoryId={memoryId}
          goBack={this.props.navigation.goBack}
        />
      </Screen>
    );
  }
}

export default VoiceRecordingScreen;
