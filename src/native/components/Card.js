// @flow
import type { BoxProps } from './Box';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Box from './Box';
import {
  getChildContext,
  childContextTypes,
  getLayoutInitialState,
  handleLayout,
} from './withLayout';

type Props = BoxProps & {
  children: any,
  onPress?: () => void,
};

class Card extends PureComponent {
  props: Props;

  static contextTypes = {
    theme: PropTypes.object,
  };

  static childContextTypes = childContextTypes;

  state = {
    ...getLayoutInitialState(),
  };

  getChildContext = getChildContext.bind(this);

  handleLayout = handleLayout.bind(this);

  render() {
    const { props } = this;
    const { children } = props;
    const componentProps = props.onPress
      ? { as: TouchableOpacity, onPress: props.onPress }
      : {};

    return (
      <Box
        {...componentProps}
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
