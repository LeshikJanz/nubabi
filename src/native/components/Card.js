// @flow
import type { Event } from 'react-native';
import type { BoxProps } from './Box';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, TouchableOpacity } from 'react-native';
import Box from './Box';

type Props = BoxProps & {
  children: any,
};

class Card extends PureComponent {
  props: Props;

  static contextTypes = {
    theme: PropTypes.object,
  };

  static childContextTypes = {
    layout: PropTypes.shape({
      viewportWidth: PropTypes.number,
      viewportHeight: PropTypes.number,
      parentWidth: PropTypes.number,
      parentHeight: PropTypes.number,
    }),
  };

  state = {
    viewportWidth: Dimensions.get('window').width,
    viewportHeight: Dimensions.get('window').height,
    parentWidth: null,
    parentHeight: null,
  };

  getChildContext() {
    return {
      layout: {
        viewportWidth: this.state.viewportWidth,
        viewportHeight: this.state.viewportHeight,
        parentWidth: this.state.parentWidth,
        height: this.state.parentHeight,
      },
    };
  }

  handleLayout = (event: Event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== this.state.width && height !== this.state.height) {
      this.setState({
        viewportWidth: Dimensions.get('window').width,
        viewportHeight: Dimensions.get('window').height,
        parentWidth: width,
        parentHeight: height,
      });
    }
  };

  componentDidUpdate() {
    console.log('updated');
  }

  render() {
    const { props } = this;
    const children = props.onPress
      ? <TouchableOpacity onPress={props.onPress}>
          {props.children}
        </TouchableOpacity>
      : props.children;

    return (
      <Box
        onLayout={this.handleLayout}
        flex={1}
        justifyContent="center"
        alignItems="stretch"
        marginBottom={1}
        padding={2}
        backgroundColor="white"
        borderRadius={4}
        {...props}
        style={theme => ({
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: {
            height: 2,
            width: 1,
          },
          ...(typeof props.style === 'function'
            ? props.style(theme)
            : props.style),
        })}
      >
        {children}
      </Box>
    );
  }
}

export default Card;
