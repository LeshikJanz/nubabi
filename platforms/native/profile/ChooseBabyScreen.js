import React, { PureComponent } from 'react';
import ChooseBaby from './ChooseBaby';
import { Screen } from '../components';

class ChooseBabyScreen extends PureComponent {
  static navigationOptions = {
    gesturesEnabled: false,
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
