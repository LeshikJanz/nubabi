// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../common/themes/defaultTheme';
import * as Animatable from 'react-native-animatable';
import RocketHorse from './RocketHorse';

type Props = {
  loading: boolean,
  disabled?: boolean,
  submitText?: string,
  onPress: () => void,
  style?: Object,
  containerStyle?: Object,
  textStyle?: Object,
  buttonStyle?: Object,
  animatedWidth?: number,
};

Animatable.initializeRegistryWithDefinitions({
  rotatingHorse360: {
    // $FlowFixMe$
    0: {
      transform: [{ rotate: '0deg' }],
    },
    // $FlowFixMe$
    1: {
      transform: [{ rotate: '360deg' }],
    },
  },
});

export class SubmitButton extends PureComponent {
  props: Props;

  state = {
    isAnimating: false,
    animation: null,
  };

  componentWillMount() {
    this.isMounted = true;
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loading !== this.props.loading) {
      const width = StyleSheet.flatten([
        styles.submitButton,
        nextProps.buttonStyle,
      ]).width;

      if (nextProps.loading === true) {
        this.setState({
          isAnimating: true,
          animation: {
            // $FlowFixMe$
            0: {
              width,
              opacity: 1,
            },
            // $FlowFixMe$
            0.5: {
              opacity: 0.5,
            },
            // $FlowFixMe$
            1: {
              width: nextProps.animatedWidth || 30,
              opacity: 1,
            },
          },
        });

        return;
      }

      if (nextProps.loading === false && this.state.isAnimating) {
        this.setState(
          {
            animation: {
              0: {
                width: nextProps.animatedWidth || 30,
                opacity: 1,
              },
              0.5: {
                opacity: 0.5,
              },
              1: {
                width,
                opacity: 1,
              },
            },
          },
          () => {
            this.timeout = setTimeout(() => {
              if (this._isMounted) {
                this.setState({ isAnimating: false }, () => {
                  this.submitTextView && this.submitTextView.fadeIn();
                });
              }
            }, 1000);
          },
        );
        return;
      }
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this._isMounted = false;
  }

  handleOnPress = () => {
    this.props.onPress();
  };

  render() {
    const {
      loading,
      disabled = false,
      submitText = 'SAVE',
      style = {}, // deprecated in favor of containerStyle
      containerStyle = {},
      buttonStyle = {},
      textStyle = {},
    } = this.props;

    const { isAnimating } = this.state;

    let buttonContent;

    if (isAnimating) {
      buttonContent = (
        <Animatable.View
          animation="rotatingHorse360"
          delay={500}
          iterationCount="infinite"
          duration={1500}
          ref={ref => (this.horseView = ref)}
        >
          <RocketHorse width={20} height={20} />
        </Animatable.View>
      );
    }

    if (!loading && !isAnimating) {
      const TextContainer = props => {
        return typeof jest === 'undefined' ? (
          <Animatable.Text
            {...props}
            ref={ref => (this.submitTextView = ref)}
          />
        ) : (
          <Text {...props} />
        );
      };

      buttonContent = (
        <TextContainer style={[styles.submitText, textStyle]}>
          {submitText}
        </TextContainer>
      );
    }

    const buttonProps = this.props.innerRef ? { ref: this.props.innerRef } : {};

    return (
      <View style={[styles.submitButtonContainer, style, containerStyle]}>
        <Animatable.View
          animation={this.state.animation}
          onAnimationBegin={this.onAnimationBegin}
          ref={ref => (this.buttonView = ref)}
          style={[styles.submitButton, buttonStyle]}
        >
          <TouchableOpacity
            onPress={this.handleOnPress}
            disable={loading || disabled}
            {...buttonProps}
          >
            {buttonContent}
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default SubmitButton;
