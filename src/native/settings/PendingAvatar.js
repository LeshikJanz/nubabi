// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from '../components';
import theme from '../../common/themes/defaultTheme';

export const PendingAvatar = () => {
  return (
    <Avatar backgroundColor={theme.colors.gray}>
      <Icon name="ios-more" size={20} color={theme.colors.white} />
    </Avatar>
  );
};

export default PendingAvatar;
