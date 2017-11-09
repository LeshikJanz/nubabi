// @flow
import type { NavigationProp } from '../../../core/types';
import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import { Screen, SubmitFormNavButton } from '../components';
import EditMemory from './EditMemory';
import { NavigationActions } from 'react-navigation';

type Props = {
  navigation: NavigationProp,
};

export class EditMemoryScreen extends Component {
  props: Props;

  static navigationOptions = {
    title: 'Edit Memory',
    headerRight: <SubmitFormNavButton form="memory" />,
  };

  handleAddVoiceNote = () => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('voiceRecording', { id });
  };

  handleGoBack = (wasRemoved = false) => {
    InteractionManager.runAfterInteractions(() => {
      if (wasRemoved && this.props.navigation.state.params.returnKey) {
        // TODO: this (and complementary code on epic) workarounds the fact
        // that you can't currently reset to a specific tab with RN.
        this.props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'home',
                action: NavigationActions.navigate({
                  routeName: this.props.navigation.state.params.returnKey,
                }),
              }),
            ],
          }),
        );
      } else if (this.props.navigation.state.routeName === 'editMemory') {
        this.props.navigation.goBack(
          this.props.navigation.state.params.parentKey,
        );
      }
    });
  };

  handleGoBackAfterDeletion = () => {
    this.handleGoBack(true);
  };

  handleEditSticker = () =>
    this.props.navigation.navigate('stickers', { mode: 'edit' });

  render() {
    const { id } = this.props.navigation.state.params;

    return (
      <Screen>
        <EditMemory
          id={id}
          onAddVoiceNote={this.handleAddVoiceNote}
          onEditSticker={this.handleEditSticker}
          goBack={this.handleGoBack}
          onMemoryRemoved={this.handleGoBackAfterDeletion}
        />
      </Screen>
    );
  }
}

export default EditMemoryScreen;
