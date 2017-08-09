// @flow
import type { NavigationProp } from '../../common/types';
import React, { Component } from 'react';
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
