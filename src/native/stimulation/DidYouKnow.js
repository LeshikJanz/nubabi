import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PANEL_BUTTON_TEXT } from '../../common/themes/defaultTheme';

const icon = require('../../common/images/didYouKnowIcon.png');

const DidYouKnow = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Did you know</Text>
        <Text style={styles.body}>
          At this time your baby will begin to babble
          routinely, often amusing herself for long persion of time!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    borderRadius: 4,
    height: 96,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 5,
    //width: 250,
  },
  title: {
    color: PANEL_BUTTON_TEXT,
    fontSize: 14,
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    color: '#748294',
  },
  icon: {
    width: 54,
    height: 54,
    marginRight: 20,
  },
});

export default DidYouKnow;
