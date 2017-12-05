// @flow
import type { LayoutState } from './withLayout';
import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import Raven from 'raven-js';
import {
  childContextTypes,
  getChildContext,
  handleLayout,
  getLayoutInitialState,
} from './withLayout';
import theme from 'core/themes/defaultTheme';
import ErrorScreen from './ErrorScreen';
import uuid from 'react-native-uuid';

type Props = {
  children: any,
  style?: any,
};

type State = LayoutState & {
  hasError: boolean,
  errorId: ?string,
};

export class Screen extends PureComponent<Props, State> {
  state = {
    ...getLayoutInitialState(),
    hasError: false,
    errorId: null,
  };

  static childContextTypes = childContextTypes;
  getChildContext = getChildContext.bind(this);
  handleLayout = handleLayout.bind(this);

  componentDidCatch(error: Error, errorInfo: mixed) {
    const errorId = uuid.v4();

    if (!__DEV__) {
      Raven.captureException(error, {
        extra: {
          boundaryInfo: errorInfo,
          referenceId: errorId,
        },
      });
    }

    this.setState({ errorId, hasError: !!error });
  }

  render() {
    const { style, children, useSafeArea } = this.props;

    const Container = useSafeArea === false ? View : SafeAreaView;
    return (
      <Container
        style={[{ flex: 1, backgroundColor: theme.colors.panel }, style]}
        onLayout={this.handleLayout}
      >
        {this.state.hasError ? (
          <ErrorScreen errorId={this.state.errorId} />
        ) : (
          children
        )}
      </Container>
    );
  }
}

export default Screen;
