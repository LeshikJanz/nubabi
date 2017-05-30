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

const background = require('../../common/images/nextWeeksEquipmentButton.jpg');

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

export const NextWeeksEquipmentButton = ({ onPress, layout }: Props) => {
  const dimensions = { width: layout.parentWidth, height: layout.parentHeight };

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <Image
        source={background}
        style={[{ flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay>
          <Text style={styles.title}>Equipment For</Text>
          <Text style={styles.title}>Next Week</Text>
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
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#748294',
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    marginTop: 65,
    height: HEIGHT,
    width: 200,
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

export default withLayout(NextWeeksEquipmentButton);
