// @flow
import type { LayoutProps } from '../../common/types/types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Overlay, withLayout } from '../components';

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

const background = require('../../common/images/browseAllActivitiesButton.jpg');

export const BrowseAllActivitiesButton = ({ onPress, layout }: Props) => {
  const dimensions = { width: layout.parentWidth, height: layout.parentHeight };
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <Image
        source={background}
        style={[styles.background, { flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay>
          <Text style={styles.title}>Browse All</Text>
          <Text style={styles.title}>Activities</Text>
        </Overlay>
      </Image>
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

export default withLayout(BrowseAllActivitiesButton);
