// @flow
import type { LayoutProps, Image as ImageType } from '../../../common/types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import withLayout from '../../components/withLayout';

const headerBackground = require('../../../common/images/profileBackground.jpg');

type Props = {
  coverImage: ?ImageType,
  layout: LayoutProps,
};

const CoverImage = ({ coverImage, layout }: Props) => {
  let imageSource;
  if (coverImage) {
    imageSource = { uri: coverImage.url };
  } else {
    imageSource = headerBackground;
  }

  const width = layout ? layout.viewportWidth : Dimensions.get('window').width;

  return (
    <View>
      <Image
        source={imageSource}
        style={{
          width,
          position: 'absolute',
          height: 210,
        }}
      />
      <View style={[styles.imageOverlay, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageOverlay: {
    height: 210,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#748294',
    opacity: 0.7,
    position: 'absolute',
    flex: 1,
  },
});

export default withLayout(CoverImage);
