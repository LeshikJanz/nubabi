// @flow
import type { Event } from 'react-native';
import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import Alert from './Alert';
import NetworkIndicator from './NetworkIndicator';
import {
  childContextTypes,
  getChildContext,
  handleLayout,
  getLayoutInitialState,
} from './withLayout';
import theme from '../../common/themes/defaultTheme';

type Props = {
  children: any,
  style?: any,
};

export class Screen extends PureComponent {
  props: Props;

  state = {
    ...getLayoutInitialState(),
  };

  static childContextTypes = childContextTypes;
  getChildContext = getChildContext.bind(this);
  handleLayout = handleLayout.bind(this);

  render() {
    const { style, children } = this.props;

    return (
      <View
        style={[{ flex: 1, backgroundColor: theme.colors.panel }, style]}
        onLayout={this.handleLayout}
      >
        {children}
        <Alert />
        <NetworkIndicator />
      </View>
    );
  }
}

export default Screen;
