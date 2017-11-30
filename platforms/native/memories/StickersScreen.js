// @flow
import React, { PureComponent } from 'react';
import { InteractionManager } from 'react-native';
import { RightNavButton, Screen } from '../components';
import Stickers from './Stickers';

export class StickersScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      InteractionManager.runAfterInteractions(() => navigation.goBack());
    };

    return {
      mode: 'modal',
      title: 'Add Sticker',
      headerRight: <RightNavButton onPress={goBack} text="Done" />,
    };
  };

  render() {
    return (
      <Screen>
        <Stickers />
      </Screen>
    );
  }
}

export default StickersScreen;
