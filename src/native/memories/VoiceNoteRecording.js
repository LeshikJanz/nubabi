// @flow
import React, { PureComponent } from 'react';
import VoiceRecording from './VoiceRecording';

type Props = {
  memoryId: ?string,
};

export class VoiceNoteRecording extends PureComponent {
  props: Props;

  render() {
    return <VoiceRecording />;
  }
}

export default VoiceNoteRecording;
