// @flow
import React from 'react';
import { Icon } from '../components';
import theme from 'core/themes/defaultTheme';

export const FacebookIcon = () => {
  return (
    <Icon
      name="logo-facebook"
      size={24}
      color={theme.colors.success}
      style={{ marginTop: 2 }}
    />
  );
};

export default FacebookIcon;
