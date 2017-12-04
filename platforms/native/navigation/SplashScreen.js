// @flow
import type { Baby, State } from 'core/types';
import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ImageCacheManager } from 'react-native-cached-image';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import firebase from 'react-native-firebase';
import { sample } from 'lodash';
import { NavigationActions } from 'react-navigation';
import theme from 'core/themes/defaultTheme';
import Alert from '../components/Alert';
import loadingMessages from './loadingMessages';
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
    InteractionManager.runAfterInteractions(this.handleNextScreen);
  }

  handleNextScreen = () => {
    const { appOnline, isAuthenticated, baby } = this.props;

    if (!appOnline) {
      return;
    }

    if (!isAuthenticated) {
      this.navigateTo('login');
      return;
    }

    if (baby) {
      const avatar = path(['avatar', 'url'], baby);
      const coverImage = path(['coverImage', 'url'], baby);

      const images = [avatar, coverImage];

      if (images.length) {
        Promise.all(
          images
            .filter(image => !!image)
            .map(image => ImageCacheManager().downloadAndCacheUrl(image)),
        ).then(() => this.navigateToApp());
      }
    } else {
      this.navigateToApp();
    }
  };

  navigateToApp = async () => {
    const initialNotification = await firebase
      .messaging()
      .getInitialNotification();
    console.log('App opened from notification', initialNotification);
    this.navigateTo('home');
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
              source={require('core/images/quote-mark-left.png')}
              style={[styles.quoteDimensions, { marginTop: -5 }]}
            />{' '}
            {loadingMessage}{' '}
            <Image
              source={require('core/images/quote-mark-right.png')}
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

        {this.props.author && (
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
          </View>
        )}
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
        <ImageBackground
          source={loadingImage}
          resizeMode="stretch"
          style={styles.textContainer}
        >
          {this.renderLoadingIndicator()}
          {this.renderLoadingMessage()}
        </ImageBackground>
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
          }
          # Get quotes for splash screen
          randomQuote {
            id
            author
            text
          }
        }
      }
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
        const quote = path(['viewer', 'randomQuote'], data);
        const baby = path(['viewer', 'baby'], data);

        let author;
        let loadingMessage;

        if (quote) {
          // eslint-disable-next-line prefer-destructuring
          author = quote.author;
          loadingMessage = quote.text;
        }

        return {
          data,
          baby,
          loadingMessage,
          author,
        };
      },
    },
  ),
)(SplashScreen);
