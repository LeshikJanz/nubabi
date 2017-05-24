// @flow
import React from 'react';
import Box from './Box';
import Text from './Text';

type Props = {
  onPress?: () => void,
  style?: Object | number,
  children: any,
};

export const FAB = ({ onPress, children, style = {} }: Props) => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      style={() => ({
        backgroundColor: '#fff',
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        shadowOpacity: 0.15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 1,
        ...style,
      })}
    >
      {children}

    </Box>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    fontSize: 21,
    color: '#EA3154',
    letterSpacing: 0,
    lineHeight: 14,
    //boxShadow: 0 1px 3px rgba(0,0,0,.15),
  },
});
*/
export default FAB;
