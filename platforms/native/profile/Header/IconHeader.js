// @flow
import type { Avatar } from 'core/types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'ramda';
import { CachedImage as Image } from 'react-native-cached-image';
import Svg, { Path, Circle } from 'react-native-svg';
import { dontUpdateForUploadedImage } from '../../components';

const babyIcon = require('core/images/face_icon.jpg');

const { width } = Dimensions.get('window');

type Props = {
  avatar: ?Avatar,
};

const IconHeader = ({ avatar }: Props) => {
  let imageSource;
  if (avatar) {
    imageSource = { uri: avatar.url };
  } else {
    imageSource = babyIcon;
  }
  const curve = `M0 0 C ${width / 2 - 20} 60, ${width / 2 + 20} 60, ${width} 0`;
  const circleSize = 40;
  const circleStart = width / 2;
  return (
    <View style={styles.iconHeaderContainer}>
      <Svg style={styles.headerShape}>
        <Path d={curve} stroke="#FFFFFF" fill="#FFFFFF" />
        <Circle cx={circleStart} cy="30" r={circleSize} fill="#FFFFFF" />
      </Svg>
      <Image source={imageSource} style={styles.babyIcon} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  iconHeaderContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageHeader: {
    backgroundColor: '#fff',
  },
  babyIcon: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginTop: -50,
  },
  headerShape: {
    height: 100,
    width,
    marginTop: 0,
    marginLeft: 0,
  },
});

export default compose(dontUpdateForUploadedImage('avatar'))(IconHeader);
