// @flow
import type { NavigationProp } from 'core/types';
import React, { PureComponent } from 'react';
import { InteractionManager } from 'react-native';
import { path, prop } from 'ramda';
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
    const params = path(['navigation', 'state', 'params'], this.props);

    const suggestedMemoryId = prop('suggestedMemoryId', params);
    const fromActivity = prop('fromActivity', params);

    return (
      <Screen>
        <AddMemory
          onEditSticker={this.handleEditSticker}
          onAddVoiceNote={this.handleAddVoiceNote}
          goBack={this.handleGoBack}
          suggestedMemoryId={suggestedMemoryId}
          fromActivity={fromActivity}
        />
      </Screen>
    );
  }
}

export default AddMemoryScreen;
