// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import WhatYouNeedToKnow from './WhatYouNeedToKnow';

export class WhatYouNeedToKnowScreen extends PureComponent {
  static navigationOptions = {
    title: 'What you need to know',
  };

  render() {
    return (
      <Screen>
        <WhatYouNeedToKnow />
      </Screen>
    );
  }
}
