// @flow
import React from 'react';
import { Text } from 'react-native';

type Props = {
  text: string,
  style?: Object | number,
};

export const HeaderTitle = ({ text, style: styleProp }: Props) => {
  return <Text style={[styles.text, styleProp]}>{text}</Text>;
};

const styles = {
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 22,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
};

export default HeaderTitle;
