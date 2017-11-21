// @flow
import type { Image as ImageType, LayoutProps } from '../../common/types/types';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Overlay, withLayout } from '../components';

type Props = {
  onPress: () => void,
  layout: LayoutProps,
  image?: ImageType | number,
  text?: string,
  style?: Object | number,
};

const defaultBackground = require('../../common/images/browseAllActivitiesButton.jpg');

export const BrowseActivitiesButton = ({
  onPress,
  layout,
  style,
  image,
  text,
}: Props) => {
  const dimensions = { width: layout.parentWidth, height: layout.parentHeight };
  let background = image || defaultBackground;
  // If we pass a RN image is set as background, otherwise get URL
  if (background && background.url) {
    background = { uri: image.url };
  }

  const caption = text ? (
    <Text style={styles.title}>{text}</Text>
  ) : (
    [
      <Text key="all" style={styles.title}>
        Browse
      </Text>,
      <Text key="activities" style={styles.title}>
        Activities
      </Text>,
    ]
  );

  return (
    <TouchableHighlight
      style={[styles.container, style]}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <ImageBackground
        source={background}
        style={[{ flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay>{caption}</Overlay>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const HEIGHT = 130;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    height: HEIGHT,
    backgroundColor: 'red',
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#748294',
    opacity: 0.4,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
  },
});

export default withLayout(BrowseActivitiesButton);
