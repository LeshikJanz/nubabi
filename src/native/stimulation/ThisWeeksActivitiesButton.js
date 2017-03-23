import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { PANEL_BUTTON_TEXT } from '../../common/themes/defaultTheme';

const background = require('../../common/images/thisWeeksActivitiesButton.png');

class ThisWeeksActivitiesButton extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const title = "This Week's Activities";

    return (
      <View
        style={styles.container}
        ref={(component) => { this._root = component; }}
        {...this.props}
      >
        <Image source={background} style={styles.background} />

        <View style={styles.overlay} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>${title}</Text>
        </View>
      </View>
    );
  }
}

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
    resizeMode: 'cover',
    height: 140,
    width: 355,
  },
});

export default ThisWeeksActivitiesButton;
