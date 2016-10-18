import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const CoverImage = ({ coverImage }) => {
  return (
    <View>
      <Image source={coverImage} style={styles.profileImage} />
      <View style={styles.imageOverlay} />
    </View>
  );
};

CoverImage.propTypes = {
  coverImage: React.PropTypes.number.isRequired,
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
