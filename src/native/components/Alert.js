// @flow
import type { State } from '../../common/types';
import React from 'react';
import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import theme from '../../common/themes/defaultTheme';

type AlertProps = {
  duration: number,
  error?: Error,
  hideTimeout: number,
};

type AlertState = {
  alertHeight: number,
  animation: Object,
};

const styles = StyleSheet.create({
  container: {
    height: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

class Alert extends React.Component {
  props: AlertProps;
  hideTimer: number;

  static defaultProps = {
    duration: 300,
    hideTimeout: 4000,
  };

  state: AlertState = {
    alertHeight: 0,
    animation: new Animated.Value(0),
  };

  componentWillReceiveProps({ error }) {
    if (!error) return;
    this.show();
  }

  onAlertLayout({ nativeEvent: { layout } }) {
    const alertHeight = layout.height;
    this.setState({ alertHeight });
  }

  onPress = () => {
    this.animateTo(0);
  };

  getContainerStyle() {
    const { alertHeight, animation } = this.state;
    return {
      height: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, alertHeight],
      }),
      opacity: animation,
    };
  }

  animateTo(toValue, fromValue) {
    const { duration } = this.props;
    const { animation } = this.state;
    if (fromValue !== undefined) {
      animation.setValue(fromValue);
    }
    Animated.timing(animation, { duration, toValue }).start();
  }


  show() {
    const { hideTimeout } = this.props;
    this.animateTo(1, 0);
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(
      () => {
        this.animateTo(0);
      },
      hideTimeout,
    );
  }

  render() {
    const { error } = this.props;
    if (!error) return null;

    // TODO: Human-frindly errors

    const errorMessage = error.message;

    if (!errorMessage) return null;

    const containerStyle = this.getContainerStyle();


    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={[styles.container, containerStyle]}>
          <View
            style={{
              backgroundColor: theme.colors.danger,
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
              padding: 10,
              alignItems: 'center',
              paddingTop: 40,
              //borderWidth: StyleSheet.hairlineWidth,
            }}
            onLayout={(e) => this.onAlertLayout(e)}
          >
            <Text
              style={{ paddingHorizontal: 1, color: 'white', padding: 0.5 }}
            >
              {errorMessage}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default compose(
  connect((state: State) => ({
    error: state.app.error,
  })),
)(Alert);
