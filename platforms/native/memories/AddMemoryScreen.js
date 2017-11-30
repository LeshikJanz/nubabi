// @flow
import type { NavigationProp } from 'core/types';
import React, { PureComponent } from 'react';
import { InteractionManager } from 'react-native';
import { path } from 'ramda';
import { Screen, SubmitFormNavButton } from '../components';
import AddMemory from './AddMemory';

type Props = {
  navigation: NavigationProp,
};

export class AddMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Add memory',
    headerRight: <SubmitFormNavButton form="memory" />,
  };

  handleAddVoiceNote = () => {
    this.props.navigation.navigate('voiceRecording');
  };

  handleGoBack = () => {
    InteractionManager.runAfterInteractions(this.props.navigation.goBack);
  };

  handleEditSticker = () => {
    this.props.navigation.navigate('stickers', { mode: 'add' });
  };

  render() {
    const suggestedMemoryId = path(
      ['navigation', 'state', 'params', 'suggestedMemoryId'],
      this.props,
    );

    return (
      <Screen>
        <AddMemory
          onEditSticker={this.handleEditSticker}
          onAddVoiceNote={this.handleAddVoiceNote}
          goBack={this.handleGoBack}
          suggestedMemoryId={suggestedMemoryId}
        />
      </Screen>
    );
  }
}

export default AddMemoryScreen;
