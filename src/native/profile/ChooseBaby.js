// @flow
import type {
  Baby,
  GraphQLDataProp,
  State,
  NavigationOptions,
  LayoutProps,
} from '../../common/types/index';
import type { NavigationProp } from 'react-navigation';
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
  TouchableOpacity,
} from 'react-native';
import SVGPath from 'art/modes/svg/path';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Svg, { Path } from 'react-native-svg';
import { NavigationActions } from 'react-navigation';
import theme, {
  HEADER_FONT_COLOR,
  NUBABI_RED,
} from '../../common/themes/defaultTheme';
import { selectBaby } from '../../common/babies/actions';
import withLayout from '../components/withLayout';

const Icon = Animated.createAnimatedComponent(IonIcon);
const babyIcon = require('../../common/images/face_icon.jpg');

type Props = {
  navigation: NavigationProp<*, *>,
  layout: LayoutProps,
  currentBabyId: ?string,
  babies: ?(Baby[]),
  data: GraphQLDataProp<*>,
  selectBaby: (id: string) => void,
};

class ChooseBaby extends Component {
  props: Props;

  static fragments = {
    list: gql`
      fragment ChooseBaby on Baby {
        id
        name
        avatar {
          url
        }
        coverImage {
          url
        }
      }
    `,
  };

  static contextTypes = {
    setActiveTransition: React.PropTypes.func,
  };

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
      transform: [{ translateY }, { scale }],
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

  elementsAnimation = new Animated.Value(0);
  buttonAnimation = new Animated.Value(0);
  listAnimation = new Animated.Value(0);

  goBack = () => {
    this.props.navigation.goBack();
    this.context.setActiveTransition('cardStack');
  };

  goToAddBaby = () => {
    this.context.setActiveTransition('cardStack');
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'home' }),
          NavigationActions.navigate({ routeName: 'addBaby' }),
        ],
      }),
    );
  };

  selectBaby = id => {
    this.props.selectBaby(id);
    this.goBack();
  };

  render() {
    const { babies } = this.props;

    const width = this.props.layout.viewportWidth;
    let babiesList = [];

    // TODO: this is more complicated than it should because we want an
    // app-shell like behavior.
    if (this.props.data.loading) {
      babiesList = (
        <Animated.View
          style={[
            {
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
            this.getListAnimatedStyle(),
          ]}
        />
      );
    } else if (babies && babies.length) {
      babiesList =
        // TODO: we definitely need a selector, and an inner component for this
        // plus: default props
        babies.map(baby => {
          const avatarSource = baby.avatar
            ? { uri: baby.avatar.url }
            : babyIcon;

          const currentBabyStyle = baby.id === this.props.currentBabyId
            ? styles.currentBaby
            : {};

          return (
            <TouchableOpacity
              style={styles.babyIconContainerView}
              key={baby.id}
              onPress={() => this.selectBaby(baby.id)}
            >
              <View style={styles.babyIconView}>
                <Image source={avatarSource} style={styles.babyIcon} />
              </View>
              <Text style={[styles.babyName, currentBabyStyle]}>
                {baby.name}
              </Text>
            </TouchableOpacity>
          );
        });
    } else {
      babiesList = (
        <Animated.View
          style={[
            {
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
            this.getListAnimatedStyle(),
          ]}
        >
          <Text>Add a baby to get started...</Text>
        </Animated.View>
      );
    }

    console.log(this.props);

    const headerShapeWidth = Math.round(
      this.props.layout.viewportWidth / 0.672,
    );

    console.log(this.props.layout.viewportHeight);
    console.log(headerShapeWidth);
    const shape = new SVGPath()
      .moveTo(242.0284455, 326.522878)
      .curveTo(242.828957, 347.908578, 260.418521, 365, 282, 365)
      .curveTo(303.756979, 365, 321.456854, 347.629474, 321.987736, 326.00031)
      .curveTo(410.423065, 317.73135, 491.521973, 284.207863, 558, 232.714294)
      .lineTo(558, 0)
      .lineTo(0, 0)
      .lineTo(0, 232.714294)
      .curveTo(
        67.9827067,
        285.373381,
        151.25565,
        319.239702,
        242.028455,
        326.522878,
      )
      .close();
    return (
      <Animated.View style={styles.overlay}>
        <Animated.View
          style={[styles.container, this.getContainerAnimatedStyle()]}
        >
          <Svg style={styles.headerShape}>
            <Path
              d="M242.028455,326.522878 C242.828957,347.908578 260.418521,365 282,365 C303.756979,365 321.456854,347.629474 321.987736,326.00031 C410.423065,317.73135 491.521973,284.207863 558,232.714294 L558,0 L0,0 L0,232.714294 C67.9827067,285.373381 151.25565,319.239702 242.028455,326.522878 Z"
              id="Combined-Shape"
              stroke="none"
              fill="#FFFFFF"
              fill-rule="evenodd"
            />
          </Svg>

          <View style={styles.babyContainer}>
            <Animated.View
              style={[styles.closeButton, this.getListAnimatedStyle()]}
            >
              <Icon
                name="ios-close-outline"
                style={styles.closeIcon}
                onPress={this.goBack}
              />
            </Animated.View>
            <ScrollView
              contentContainerStyle={{
                width,
                height: 80,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              {babiesList}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={[styles.addButton, this.getButtonAnimatedStyle()]}
            onPress={this.goToAddBaby}
          >
            <Icon name="ios-add-circle" size={45} color={NUBABI_RED} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

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
    alignItems: 'flex-start',
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
    color: theme.colors.black,
    backgroundColor: 'transparent',
  },
  currentBaby: {
    color: theme.colors.primary,
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

export const query = gql`
  query ChooseBabyList {
    viewer {
      babies {
        edges {
          node {
            ...ChooseBaby
          }
        }
      }
    }
  }
  ${ChooseBaby.fragments.list}
`;

export default compose(
  connect(
    (state: State) => ({
      currentBabyId: state.babies.currentBabyId,
    }),
    {
      selectBaby,
    },
  ),
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
    },
    props: ({ data }) => {
      const babies = path(['viewer', 'babies', 'edges'], data);

      return {
        data,
        babies: babies ? babies.map(edge => edge.node) : null,
      };
    },
  }),
  withLayout,
)(ChooseBaby);
