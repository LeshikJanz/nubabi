import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const headerBackground = require('../../../common/images/profileBackground.jpg');

const CoverImage = ({ coverImage }) => {
  let imageSource;
  if (coverImage === '') {
    imageSource = headerBackground;
  } else {
    imageSource = { uri: coverImage };
  }
  return (
    <View>
      <Image source={imageSource} style={styles.profileImage} />
      <View style={styles.imageOverlay} />
    </View>
  );
};

CoverImage.propTypes = {
  coverImage: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  profileImage: {
    flex: 1,
    height: 210,
    width: window.width,
    position: 'absolute',
  },
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

export default CoverImage;
