// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Alert from './Alert';
import NetworkIndicator from './NetworkIndicator';
import {
  childContextTypes,
  getChildContext,
  handleLayout,
  getLayoutInitialState,
} from './withLayout';
import theme from '../../../core/themes/defaultTheme';

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
      </View>
    );
  }
}

export default Screen;
