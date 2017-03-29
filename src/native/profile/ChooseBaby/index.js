import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Svg, { Path } from 'react-native-svg';
import { NavigationProp } from 'react-navigation';
import type { Baby } from '../../common/types';
import {
  HEADER_FONT_COLOR,
  NUBABI_RED,
} from '../../../common/themes/defaultTheme';

const window = Dimensions.get('window');

const Icon = Animated.createAnimatedComponent(IonIcon);
const babyIcon = require('../../../common/images/face_icon.jpg');

type Props = {
  navigation: NavigationProp<*, *>,
  babies: Array<Baby>,
}

class ChooseBaby extends Component {
  props: Props;

  static navigationOptions = {
    cardStack: {
      gesturesEnabled: false,
    },
  };

  static contextTypes = {
    setActiveTransition: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.elementsAnimation = new Animated.Value(0);
    this.buttonAnimation = new Animated.Value(0);
    this.listAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.stagger(400, [
      Animated.spring(this.elementsAnimation, {
        toValue: 2,
        velocity: 3,
        tension: -10,
        friction: 1.5,
      }),
      Animated.spring(this.listAnimation, {
        toValue: 2,
        easing: Easing.linear,
      }),
      Animated.spring(this.buttonAnimation, {
        toValue: 2,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }

  getContainerAnimatedStyle() {
    const value = this.elementsAnimation;

    const inputRange = [0, 1, 2];

    const translateY = value.interpolate({
      inputRange,
      outputRange: [-100, -75, 0],
    });

    const scale = value.interpolate({
      inputRange,
      outputRange: [0, 0.5, 1],
    });

    return {
      transform: [
        { translateY },
        { scale },
      ],
    };
  }

  getListAnimatedStyle() {
    const value = this.listAnimation;

    const opacity = value.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0.3, 1],
    });

    return {
      opacity,
    };
  }

  getButtonAnimatedStyle() {
    const value = this.buttonAnimation;

    const scale = value.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1.5, 1],
    });

    return {
      transform: [{ scale }],
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.context.setActiveTransition('cardStack');
  };

  render() {
    let babiesList = [];
    if (this.props.babies.length) {
      babiesList = (
        // TODO: we definitely need a selector, and an inner component for this
        this.props.babies.map((baby) => {
          let avatarSource;
          if (baby.avatar_thumb === '') {
            avatarSource = babyIcon;
          } else {
            avatarSource = { uri: baby.avatar_thumb };
          }
          return (
            <View style={styles.babyIconContainerView} key={baby.id}>
              <View style={styles.babyIconView}>
                <Image source={avatarSource} style={styles.babyIcon} />
              </View>
              <Text style={styles.babyName}>{baby.name}</Text>
            </View>
          );
        })
      );
    } else {
      babiesList = (
        <Animated.View
          style={[
            {
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }, this.getListAnimatedStyle()]}
        >
          <Text>Add a baby to get started...</Text>
        </Animated.View>
      );
    }
    return (
      <Animated.View style={styles.overlay}>
        <Animated.View
          style={[styles.container, this.getContainerAnimatedStyle()]}
        >
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
            <Animated.View style={[styles.closeButton, this.getListAnimatedStyle()]}>
              <Icon
                name="ios-close-outline"
                style={styles.closeIcon}
                onPress={this.goBack}
              />
            </Animated.View>
            <ScrollView
              contentContainerStyle={{
                height: 80,
                width: window.width,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 10,
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
            style={[styles.addButton, this.getButtonAnimatedStyle()]}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    babies: state.babies.items,
  };
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0, .6)',
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  babyContainer: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: window.width,
    alignItems: 'center',
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
  closeButton: {
    marginTop: 15,
    height: 25,
    alignSelf: 'flex-start',
  },
  closeIcon: {
    padding: 10,
    backgroundColor: 'transparent',
    color: HEADER_FONT_COLOR,
    fontSize: 25,
    marginTop: -6,
    marginRight: -4,
  },
});

export default connect(mapStateToProps)(ChooseBaby);
