// @flow
import type { State, Baby } from '../../common/types';
import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, LayoutAnimation, Text } from 'react-native';
import { ImageCacheProvider } from 'react-native-cached-image';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { sample } from 'lodash';
import { NavigationActions } from 'react-navigation';
import theme from '../../common/themes/defaultTheme';
import Alert from '../components/Alert';
import loadingMessages from './loadingMessages';

const loadingImage = { uri: 'LaunchImage' };

type Props = {
  appOnline: boolean,
  navigation: any,
  isAuthenticated: boolean,
  loadingMessage: ?string,
  author: ?string,
  baby: ?Baby,
};

class SplashScreen extends PureComponent {
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
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.spring,
      duration: 400,
    });

    setTimeout(this.handleNextScreen, 2000);
  }

  handleNextScreen = () => {
    const { appOnline, isAuthenticated, baby } = this.props;
    if (!appOnline) {
      return;
    }

    if (!isAuthenticated) {
      return this.navigateTo('login');
    }

    if (baby) {
      const avatar = path(['avatar', 'url'], baby);
      const coverImage = path(['coverImage', 'url'], baby);

      ImageCacheProvider.cacheMultipleImages([avatar, coverImage]).then(() =>
        this.navigateTo('home'),
      );
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
      return null;
    }

    const loadingMessage =
      this.props.loadingMessage || sample(loadingMessages.splash);

    return (
      <View style={styles.loadingMessageContainer}>
        <Text style={styles.loadingMessage}>
          {loadingMessage}
        </Text>
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
                fontSize: 14,
                color: theme.colors.open.gray0,
                fontStyle: 'italic',
              }}
            >
              {this.props.author}
            </Text>
          </View>}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={loadingImage} style={styles.textContainer}>
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
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessage: {
    width: 274, // TODO: I don't like this
    margin: 20,
    color: theme.colors.open.gray0,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 26,
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
      query SplashScreen($currentBabyId: ID!, $hasCurrentBaby: Boolean!) {
        viewer {
          baby(id: $currentBabyId) @include(if: $hasCurrentBaby) {
            avatar {
              url
            }
            coverImage {
              url
            }
          },
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
          loadingMessage,
          author,
        };
      },
    },
  ),
)(SplashScreen);
