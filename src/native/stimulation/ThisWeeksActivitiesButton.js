import type { LayoutProps } from '../../common/types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import { PANEL_BUTTON_TEXT } from '../../common/themes/defaultTheme';
import { Overlay, withLayout } from '../components';

const background = require('../../common/images/gross_motor_large.jpg');

type Props = {
  onPress: () => void,
  style?: number,
  layout: LayoutProps,
};

export const ThisWeeksActivitiesButton = ({
  onPress,
  style,
  layout,
}: Props) => {
  const title = "This Week's Activities";
  const width = {
    width: layout.viewportWidth,
  };

  return (
    <TouchableHighlight
      style={style}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          source={background}
          style={[styles.background, width]}
          resizeMode="cover"
        >
          <Overlay />
        </Image>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderRadius: 4,
    height: 97,
    margin: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 100,
      width: 200,
    },
    overflow: 'hidden',
  },
  overlay: {
    width: 355,
    height: 140,
    position: 'absolute',
    backgroundColor: '#748294',
    opacity: 0.3,
    top: 0,
  },
  title: {
    fontSize: 16,
    justifyContent: 'center',
    color: PANEL_BUTTON_TEXT,
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
    paddingTop: 15,
  },
  background: {
    height: 140,
    width: 355,
  },
});

export default withLayout(ThisWeeksActivitiesButton);
