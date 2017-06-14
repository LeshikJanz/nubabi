// @flow
import React from 'react';
import merge from 'lodash';
import { StyleSheet } from 'react-native';
import Image from 'react-native-cached-image';

type Props = {
  style?: Object | number,
  source: Object | number,
};

export const HeaderImage = ({ source, style: styleProp }: Props) => {
  return (
    <Image
      source={source}
      style={[styles.headerImage, styleProp]}
      resizeMode="cover"
    />
  );
};

const styles = {
  headerImage: {
    flex: 1,
  },
};

export default HeaderImage;
