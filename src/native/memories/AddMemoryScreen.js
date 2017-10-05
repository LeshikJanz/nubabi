// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { compose, path } from 'ramda';
import { withProps } from 'recompose';
import { Screen } from '../components';
import AddMemory from './AddMemory';
import {
  type SuggestedMemoryType,
  findSuggestedMemoryById,
} from './SuggestedMemories';

type Props = {
  navigation: NavigationProp,
  suggestedMemoryType: ?SuggestedMemoryType,
};

export class AddMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Add memory',
  };

  handleAddVoiceNote = () => {
    this.props.navigation.navigate('voiceRecording');
  };

  render() {
    return (
      <Screen>
        <AddMemory
          onAddVoiceNote={this.handleAddVoiceNote}
          goBack={this.props.navigation.goBack}
          suggestedMemoryType={this.props.suggestedMemoryType}
        />
      </Screen>
    );
  }
}

// prettier-ignore
const suggestedMemoryPath = path(['navigation', 'state', 'params', 'suggestedMemoryId']);

export default compose(
  withProps((ownerProps: Props) => ({
    suggestedMemoryType: findSuggestedMemoryById(
      suggestedMemoryPath(ownerProps),
    ),
  })),
)(AddMemoryScreen);
