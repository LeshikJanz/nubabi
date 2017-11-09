// @flow
import React from 'react';
import Box from './Box';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  direction?: 'right' | 'left',
  size?: number,
};

export const ListItemArrow = ({ direction = 'right', size = 20 }: Props) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <Icon
        color={theme.colors.secondary}
        name={`ios-arrow-${direction === 'left' ? 'back' : 'forward'}`}
        size={size}
      />
    </Box>
  );
};

export default ListItemArrow;
