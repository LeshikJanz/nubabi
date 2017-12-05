import React, { PureComponent } from 'react';
import ChooseBaby from './ChooseBaby';
import { Screen } from '../components';

class ChooseBabyScreen extends PureComponent {
  static navigationOptions = {
    gesturesEnabled: false,
    headerLeft: null,
    headerStyle: {
      opacity: 1,
      borderBottomWidth: 0,
      shadowOpacity: 0,
      backgroundColor: '#fff',
    },
  };

  render() {
    return (
      <Screen>
        <ChooseBaby {...this.props} />
      </Screen>
    );
  }
}

export default ChooseBabyScreen;
