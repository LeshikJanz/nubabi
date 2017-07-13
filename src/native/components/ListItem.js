// @flow
import React, { Component } from 'react';
import { TouchableOpacity, Switch } from 'react-native';
import Box from './Box';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../common/themes/defaultTheme';

type Props = {
  children: any,
  leftIcon?: string,
  avatarLeft?: React.Element<*>,
  rightToggle?: boolean,
  onRightTogglePress?: () => void,
  style?: Object | number,
  rightArrow?: boolean,
  borderWidth?: number,
  borderColor?: string,
  backgroundColor?: string,
  last?: boolean,
  rightText?: string,
  onPress?: Function,
};

class ListItem extends Component {
  props: Props;

  renderLeftAvatar(leftAvatar: React.Element<*>) {
    return (
      <Box alignItems="center" justifyContent="center" marginRight={0.5}>
        {leftAvatar}
      </Box>
    );
  }

  renderRightArrow() {
    return (
      <Box alignItems="center" justifyContent="center">
        <Icon
          color={theme.colors.secondary}
          name="ios-arrow-forward"
          size={20}
        />
      </Box>
    );
  }

  renderIcon(iconName: string) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        padding={0}
        marginRight={0.5}
        marginTop={0.1}
        style={() => ({ width: 20 })}
      >
        <Icon color={theme.colors.secondary} size={20} name={iconName} />
      </Box>
    );
  }

  renderRightToggle() {
    return (
      <Switch
        value={this.props.rightToggle}
        onValueChange={this.props.onRightTogglePress}
      />
    );
  }

  renderMainSection() {
    const { children, rightText } = this.props;

    if (!rightText) {
      return children;
    }

    return (
      <Box flexDirection="row" flex={1} justifyContent="center">
        <Box flex={1}>
          {children}
        </Box>
        <Box marginRight={0.5} marginTop={0.1}>
          <Text color="secondary">
            {rightText}
          </Text>
        </Box>
      </Box>
    );
  }

  render() {
    const {
      style,
      children,
      leftIcon,
      borderWidth = 1,
      borderColor = 'separator',
      backgroundColor = 'white',
      avatarLeft,
      rightArrow,
      last,
      onPress,
      rightToggle,
      padding = 1,
      onRightTogglePress,
    } = this.props;

    const borders = last ? { borderBottomWidth: borderWidth } : {};

    const containerProps = {
      ...borders,
      borderTopWidth: borderWidth,
      borderColor,
      backgroundColor,
      padding,
    };

    if (onPress) {
      containerProps.as = TouchableOpacity;
      containerProps.onPress = onPress;
    }

    return (
      <Box {...containerProps}>
        <Box flexDirection="row">
          {avatarLeft && this.renderLeftAvatar(avatarLeft)}
          {leftIcon && this.renderIcon(leftIcon)}

          <Box flex={1} justifyContent="center">
            {this.renderMainSection()}
          </Box>

          <Box>
            {typeof rightToggle !== 'undefined' && this.renderRightToggle()}
          </Box>

          <Box alignSelf="center">
            {rightArrow && this.renderRightArrow()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ListItem;
