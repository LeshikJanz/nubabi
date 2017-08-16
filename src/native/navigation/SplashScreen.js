// @flow
import type { Baby, BabyEdge, State } from '../../common/types';
import React, { Component } from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ImageCacheProvider } from 'react-native-cached-image';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { sample } from 'lodash';
import { NavigationActions } from 'react-navigation';
import theme from '../../common/themes/defaultTheme';
import Alert from '../components/Alert';
import loadingMessages from './loadingMessages';
import ChooseBaby from '../profile/ChooseBaby';
import * as Animatable from 'react-native-animatable';
import RocketHorseLoader from '../components/RocketHorseLoader';

const loadingImage = { uri: 'LaunchImage' };

type Props = {
  appOnline: boolean,
  appStarted: boolean,
  navigation: any,
  isAuthenticated: boolean,
  loadingMessage: ?string,
  author: ?string,
  baby: ?Baby,
  babies: ?Array<BabyEdge>,
};

class SplashScreen extends Component {
  props: Props;

  static navigationOptions = {
    headerVisible: false,
  };

  shouldComponentUpdate(nextProps) {
    if (
      typeof this.props.loadingMessage === 'undefined' &&
      nextProps.loadingMessage
    ) {
      return true;
    }

    return nextProps.appOnline !== this.props.appOnline;
  }

  componentDidUpdate() {
    setTimeout(this.handleNextScreen, 2000);
  }

  handleNextScreen = () => {
    const { appOnline, isAuthenticated, baby, babies } = this.props;

    if (!appOnline) {
      return;
    }

    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.spring,
      duration: 400,
    });

    if (!isAuthenticated) {
      this.navigateTo('login');
      return;
    }

    if (baby) {
      const avatar = path(['avatar', 'url'], baby);
      const coverImage = path(['coverImage', 'url'], baby);

      const images = [avatar, coverImage];

      if (babies && babies.length) {
        babies.forEach(babyEdge => {
          const image = path(['node', 'avatar', 'url'], babyEdge);
          if (image) {
            images.push(image);
          }
        });
      }

      if (images.length) {
        ImageCacheProvider.cacheMultipleImages(images).then(() =>
          this.navigateTo('home'),
        );
      }
    } else {
      this.navigateTo('home');
    }
  };

  navigateTo = routeName => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
      meta: {
        splash: true,
      },
    });

    this.props.navigation.dispatch(resetAction);
  };

  renderLoadingMessage() {
    if (!this.props.appStarted) {
      return <View style={styles.loadingMessageContainer} />;
    }

    const loadingMessage =
      this.props.loadingMessage || sample(loadingMessages.splash);

    return (
      <View style={styles.loadingMessageContainer}>
        <Animatable.Text style={styles.loadingMessage} animation="fadeIn">
          <Text style={{ fontWeight: theme.text.light.toString() }}>
            <Image
              source={require('../../common/images/quote-mark-left.png')}
              style={[styles.quoteDimensions, { marginTop: -5 }]}
            />{' '}
            {loadingMessage}{' '}
            <Image
              source={require('../../common/images/quote-mark-right.png')}
              style={[
                styles.quoteDimensions,
                {
                  bottom: 0,
                  right: 2,
                  marginTop: -5,
                },
              ]}
            />
          </Text>
        </Animatable.Text>

        {this.props.author &&
          <View
            style={{
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: '#F8F9FC',
                fontWeight: theme.text.medium.toString(),
              }}
            >
              - {this.props.author}
            </Text>
          </View>}
      </View>
    );
  }

  renderLoadingIndicator() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <RocketHorseLoader splash />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={loadingImage}
          resizeMode="stretch"
          style={styles.textContainer}
        >
          {this.renderLoadingIndicator()}
          {this.renderLoadingMessage()}
        </Image>
        <Alert />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  loadingMessage: {
    width: 274, // TODO: I don't like this
    marginVertical: 20,
    marginHorizontal: 5,
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 22,
  },
  quoteDimensions: {
    width: 7,
    height: 11.45,
    zIndex: 999,
  },
});

export default compose(
  connect((state: State) => {
    return {
      appOnline: state.app.online,
      appStarted: state.app.started,
      isAuthenticated: state.auth.isAuthenticated,
      currentBabyId: state.babies.currentBabyId,
    };
  }),
  graphql(
    gql`
      query SplashScreen($currentBabyId: ID, $hasCurrentBaby: Boolean!) {
        viewer {
          # Prefetch current baby avatar and coverImage
          baby(id: $currentBabyId) @include(if: $hasCurrentBaby) {
            id
            avatar {
              url
            }
            coverImage {
              url
            }
          },
          # Choose Baby
          babies {
            edges {
              node {
                id
                ...ChooseBaby
              }
            }
          }
          # Get quotes for splash screen
          allQuotes {
            edges {
              node {
                id
                author
                text
              }
            }
          }
        }
      }
      ${ChooseBaby.fragments.list}
    `,
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network',
        skip: !ownProps.isAuthenticated,
        variables: {
          currentBabyId: ownProps.currentBabyId,
          hasCurrentBaby: !!ownProps.currentBabyId,
        },
      }),
      props: ({ data }) => {
        const edges = path(['viewer', 'allQuotes', 'edges'], data);
        const baby = path(['viewer', 'baby'], data);
        const babies = path(['viewer', 'babies', 'edges'], data);

        let loadingMessage;
        let author;

        if (edges) {
          const quote = sample(edges.map(edge => edge.node));
          loadingMessage = quote.text;
          author = quote.author;
        }

        return {
          data,
          baby,
          babies,
          loadingMessage,
          author,
        };
      },
    },
  ),
)(SplashScreen);
