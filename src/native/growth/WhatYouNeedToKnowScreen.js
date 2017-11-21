// @flow
import type { NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import WhatYouNeedToKnow from './WhatYouNeedToKnow';

export class WhatYouNeedToKnowScreen extends PureComponent {
  static navigationOptions: NavigationOptions = {
    title: 'What to expect',
  };

  render() {
    return (
      <Screen>
        <WhatYouNeedToKnow />
      </Screen>
    );
  }
}
