// @flow
import type { NavigationProp } from '../../common/types';
import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { path } from 'ramda';
import { Screen } from '../components';
import EditMemory from './EditMemory';
import EditMemoryHeader from './EditMemoryHeader';

type Props = {
  navigation: NavigationProp,
};

export class EditMemoryScreen extends Component {
  props: Props;

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Memory',
      headerRight: (
        <EditMemoryHeader
          memoryId={navigation.state.params.id}
          goBack={() => navigation.goBack(navigation.state.params.parentKey)}
        />
      ),
    };
  };

  handleAddVoiceNote = () => {
    const id = this.props.navigation.state.params.id;
    this.props.navigation.navigate('voiceRecording', { id });
  };

  handleGoBack = () => {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.navigation.state.routeName === 'editMemory') {
        this.props.navigation.goBack(
          this.props.navigation.state.params.parentKey,
        );
      }
    });
  };

  handleEditSticker = () =>
    this.props.navigation.navigate('stickers', { mode: 'edit' });

  render() {
    const id = this.props.navigation.state.params.id;

    return (
      <Screen>
        <EditMemory
          id={id}
          onAddVoiceNote={this.handleAddVoiceNote}
          onEditSticker={this.handleEditSticker}
          goBack={this.handleGoBack}
        />
      </Screen>
    );
  }
}

export default EditMemoryScreen;
