// @flow
import type { NavigationOptions } from 'core/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import WhatYouNeedToKnow from './WhatYouNeedToKnow';

export class WhatYouNeedToKnowScreen extends PureComponent {
  static navigationOptions: NavigationOptions = {
    title: 'What to Expect',
  };

  render() {
    return (
      <Screen>
        <WhatYouNeedToKnow />
      </Screen>
    );
  }
}
