// @flow
import type { NavigationProp } from 'core/types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { path } from 'ramda';
import { Icon, Screen } from '../components';
import ChooseBaby from './ChooseBaby';

type Props = {
  navigation: NavigationProp,
};

class ChooseBabyScreen extends PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    headerLeft: () => {
      const onPress = path(['state', 'params', 'onBack'], navigation);
      return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
          <Icon name="ios-close-outline" size={24} />
        </TouchableOpacity>
      );
    },

    title: 'Choose Baby',
    headerStyle: {
      opacity: 1,
      borderBottomWidth: 0,
      shadowOpacity: 0,
      backgroundColor: '#fff',
    },
  });

  render() {
    return (
      <Screen>
        <ChooseBaby {...this.props} />
      </Screen>
    );
  }
}

export default ChooseBabyScreen;
