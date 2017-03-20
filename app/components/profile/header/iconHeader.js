import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {
 Path,
 Circle,
} from 'react-native-svg';

const babyIcon = require('../../../images/face_icon.jpg');

const width = Dimensions.get('window').width;

const IconHeader = ({ avatar }) => {
  let imageSource;
  if (avatar === '') {
    imageSource = babyIcon;
  } else {
    imageSource = { uri: avatar };
  }
  const curve = `M0 0 C ${(width / 2) - 20} 60, ${(width / 2) + 20} 60, ${width} 0`;
  const circleSize = 40;
  const circleStart = (width / 2);
  return (
    <View style={styles.iconHeaderContainer}>
      <Svg
        style={styles.headerShape}
      >
        <Path d={curve} stroke="#FFFFFF" fill="#FFFFFF" />
        <Circle cx={circleStart} cy="30" r={circleSize} fill="#FFFFFF" />
      </Svg>
      <Image source={imageSource} style={styles.babyIcon} />
    </View>
  );
};

IconHeader.propTypes = {
  avatar: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  iconHeaderContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageHeader: {
    backgroundColor: '#fff',
  },
  babyIcon: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    resizeMode: 'stretch',
    marginTop: -100,
  },
  headerShape: {
    height: 100,
    width,
    marginTop: 0,
    marginLeft: 0,
  },
});

export default IconHeader;
