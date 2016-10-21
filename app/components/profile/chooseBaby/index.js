import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, {
 Path,
} from 'react-native-svg';

import { POP_ROUTE } from '../../../actions/actionTypes';
import { NUBABI_RED } from '../../../constants/colours';

const window = Dimensions.get('window');

const babyIcon = require('../../../images/face_icon.jpg');

function forInitial(props) {
  const {
    navigationState,
    scene,
  } = props;

  const focused = navigationState.index === scene.index;
  const opacity = focused ? 1 : 0;
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [
      { translateX: translate },
      { translateY: translate },
    ],
  };
}

class ChooseBaby extends Component {
  constructor(props) {
    super(props);
    this._handleBack = this._handleBack.bind(this);
  }

  getAnimatedStyle() {
    const {
      layout,
      position,
      scene,
    } = this.props;

    if (!layout.isMeasured) {
      return forInitial(this.props);
    }

    const index = scene.index;
    const inputRange = [index - 1, index, index + 1];
    const height = layout.initHeight;
    const width = layout.initWidth;

    const opacity = position.interpolate({
      inputRange,
      outputRange: ([1, 1, 0.3]),
    });

    const scale = position.interpolate({
      inputRange,
      outputRange: ([1, 1, 0.95]),
    });

    const translateX = position.interpolate({
      inputRange,
      outputRange: ([-width, 0, 200]),
    });
    const translateY = position.interpolate({
      inputRange,
      outputRange: ([-height, 0, -10]),
    });

    return {
      opacity,
      transform: [
        { scale },
        { translateX },
        { translateY },
      ],
    };
  }

  _handleBack() {
    this.props.onNavigate({ type: POP_ROUTE });
  }

  render() {
    let babiesList = [];
    if (this.props.babies.babies !== undefined) {
      babiesList = (
        this.props.babies.babies.map((baby, idx) => {
          let avatarSource;
          if (baby.avatar_thumb === '') {
            avatarSource = babyIcon;
          } else {
            avatarSource = { uri: baby.avatar_thumb };
          }
          return (
            <View style={styles.babyIconContainerView} key={idx}>
              <View style={styles.babyIconView}>
                <Image source={avatarSource} style={styles.babyIcon} />
              </View>
              <Text style={styles.babyName}>{baby.name}</Text>
            </View>
          );
        })
      );
    }
    return (
      <Animated.View style={[styles.container, this.getAnimatedStyle()]}>
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
        <View style={styles.babyContainer}>
          <ScrollView
            style={{
              height: 80,
              width: window.width,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 5,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {babiesList}
          </ScrollView>
        </View>
        <Icon
          name="ios-add-circle"
          size={45}
          color={NUBABI_RED}
          style={styles.addButton}
        />
      </Animated.View>
    );
  }
}

ChooseBaby.propTypes = {
  onNavigate: React.PropTypes.func.isRequired,
  babies: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.tabReducer,
    babies: state.babyReducer,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  babyContainer: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: window.width,
    alignItems: 'center',
    height: 150,
  },
  babyIconContainerView: {
    flex: 1,
    alignItems: 'center',
  },
  babyIconView: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'stretch',
  },
  babyName: {
    fontSize: 10,
    color: NUBABI_RED,
    backgroundColor: '#fff',
  },
  addButton: {
    marginTop: -50,
    backgroundColor: 'transparent',
    marginLeft: -1,
  },
  headerShape: {
    height: 365,
    width: 558,
    marginTop: -200,
    marginLeft: -7,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseBaby);
