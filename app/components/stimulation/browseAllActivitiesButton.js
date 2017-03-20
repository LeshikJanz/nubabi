import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const background = require('../../images/browseAllActivitiesButton.png');

import { PANEL_BUTTON_TEXT } from '../../constants/colours';

class BrowseAllActivitiesButton extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View
        style={styles.container}
        ref={component => this._root = component}
        {...this.props}
      >
          <Image
            source={background}
            style={styles.background}>
            <View style={styles.textContainer}>
              <View style={styles.overlay} />
              <Text style={styles.title}>Browse All</Text>
              <Text style={styles.title}>Activities</Text>
            </View>
          </Image>
      </View>
    );
  }
}

const HEIGHT = 130;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  background: {
    resizeMode: 'contain',
    width: 175,
  }
});

export default BrowseAllActivitiesButton;

