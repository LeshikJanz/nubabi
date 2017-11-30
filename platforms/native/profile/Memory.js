// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FONT_COLOR } from 'core/themes/defaultTheme';

const Memory = ({ memory }) => {
  return (
    <View style={styles.memoryView}>
      <View style={styles.memoryImageView}>
        <Image
          source={memory.image}
          style={styles.memoryImage}
          resizeMode="stretch"
        />
      </View>
      <Text style={styles.memoryText}>{memory.caption}</Text>
    </View>
  );
};

Memory.propTypes = {
  memory: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  memoryView: {
    width: 115,
    height: 120,
    marginRight: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 4,
    padding: 0,
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    alignItems: 'center',
  },
  memoryImageView: {
    height: 78,
    width: 115,
  },
  memoryImage: {
    height: 78,
    width: 115,
  },
  memoryText: {
    height: 37,
    color: FONT_COLOR,
    fontSize: 11,
    padding: 8,
  },
});

export default Memory;
