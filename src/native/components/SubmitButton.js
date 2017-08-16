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
};

Animatable.initializeRegistryWithDefinitions({
  collapsingButton: {
    style: {
      perspective: 400,
    },
    0: {
      width: 100,
    },
    1: {
      width: 30,
    },
  },
  expandingButton: {
    0: {
      width: 30,
    },
    1: {
      width: 100,
    },
  },
  rotatingHorse360: {
    0: {
      transform: [{ rotate: '0deg' }],
    },
    1: {
      transform: [{ rotate: '360deg' }],
    },
  },
});

export class SubmitButton extends PureComponent {
  props: Props;

  state = {
    isAnimating: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.loading === false &&
      this.props.loading === true &&
      this.state.isAnimating
    ) {
      this.buttonView.expandingButton(500).then(() => {
        this.setState({ isAnimating: false });
      });
    }
  }

  handleOnPress = () => {
    this.setState({ isAnimating: true }, () => {
      this.buttonView.collapsingButton(500).then(endState => {
        if (endState.finished) {
          this.props.onPress();
        }
      });
    });
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
      buttonContent = (
        <Text style={[styles.submitText, textStyle]}>
          {submitText}
        </Text>
      );
    }

    if (loading) {
      style.opacity = 0.2;
    }

    if (disabled) {
      style.opacity = theme.states.disabled.opacity;
    }

    return (
      <View style={[styles.submitButtonContainer, style, containerStyle]}>
        <Animatable.View
          ref={ref => (this.buttonView = ref)}
          style={[styles.submitButton, buttonStyle]}
        >
          <TouchableOpacity
            onPress={this.handleOnPress}
            disable={loading || disabled}
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
