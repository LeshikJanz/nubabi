import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const icon = require('../../images/star.png');

import { PANEL_BUTTON_TEXT } from '../../constants/colours';

class FavouritesButton extends Component {
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
            source={icon}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.date}>View</Text>
            <Text style={styles.month}>Favourites</Text>
          </View>
      </View>
    );
  }
}

const HEIGHT = 66;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    color: '#748294',
    backgroundColor: 'transparent',
  },
  month: {
    fontSize: 14,
    color: '#748294',
    backgroundColor: 'transparent',
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 30,
    marginRight: 20,
  },
});

export default FavouritesButton;

