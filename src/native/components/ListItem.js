// @flow
import React, { PureComponent } from 'react';
import { TouchableOpacity, Switch } from 'react-native';
import Box from './Box';
import Text from './Text';
import ListItemArrow from './ListItemArrow';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../common/themes/defaultTheme';
import { isEditable } from '../shared/forms';

type Props = {
  children: any,
  leftIcon?: string,
  iconColor?: string,
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
  padding?: number,
  editable: boolean,
};

class ListItem extends PureComponent {
  props: Props;

  static defaultProps = {
    editable: true,
  };

  renderLeftAvatar(leftAvatar: React.Element<*>) {
    return (
      <Box alignItems="center" justifyContent="center" marginRight={0.5}>
        {leftAvatar}
      </Box>
    );
  }

  renderRightArrow() {
    return <ListItemArrow />;
  }

  renderIcon(iconName: string, color: string = theme.colors.secondary) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        padding={0}
        marginRight={0.5}
        marginTop={0.1}
        style={() => ({ width: 20 })}
      >
        <Icon color={color} size={20} name={iconName} />
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
        <Box flex={1}>{children}</Box>
        <Box marginRight={0.5} marginTop={0.1}>
          <Text color="secondary">{rightText}</Text>
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

    if (isEditable(this.props) && onPress) {
      containerProps.as = TouchableOpacity;
      containerProps.onPress = onPress;
    }

    return (
      <Box {...containerProps}>
        <Box flexDirection="row">
          {avatarLeft && this.renderLeftAvatar(avatarLeft)}
          {leftIcon && this.renderIcon(leftIcon, this.props.iconColor)}

          <Box flex={1} justifyContent="center">
            {this.renderMainSection()}
          </Box>

          <Box>
            {typeof rightToggle !== 'undefined' && this.renderRightToggle()}
          </Box>

          <Box alignSelf="center">{rightArrow && this.renderRightArrow()}</Box>
        </Box>
      </Box>
    );
  }
}

export default ListItem;
