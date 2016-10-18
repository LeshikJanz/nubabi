import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Svg, {
 Path,
} from 'react-native-svg';

const IconHeader = ({ avatar }) => {
  return (
    <View style={styles.iconHeaderContainer}>
      <Svg
        style={styles.headerShape}
      >
        <Path
          d="M242.028455,326.522878 C242.828957,347.908578 260.418521,365 282,365 C303.756979,365 321.456854,347.629474 321.987736,326.00031 C410.423065,317.73135 491.521973,284.207863 558,232.714294 L558,0 L0,0 L0,232.714294 C67.9827067,285.373381 151.25565,319.239702 242.028455,326.522878 Z"
          id="Combined-Shape"
          stroke="none"
          fill="#FFFFFF"
          fill-rule="evenodd"
        />
      </Svg>
      <Image source={avatar} style={styles.babyIcon} />
    </View>
  );
};

IconHeader.propTypes = {
  avatar: React.PropTypes.number.isRequired,
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
    marginTop: -68,
  },
  headerShape: {
    height: 365,
    width: 558,
    marginTop: -286,
    marginLeft: -7,
  },
});

export default IconHeader;
