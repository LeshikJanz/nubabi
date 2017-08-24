// @flow
import React from 'react';
import VoiceRecording from './VoiceRecording';

type Props = {
  goBack: () => void,
};

export const VoiceNoteRecording = ({ goBack }: Props) => {
  return <VoiceRecording goBack={goBack} />;
};

export default VoiceNoteRecording;
