// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, LayoutAnimation, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { sample } from 'lodash';
import { NavigationActions } from 'react-navigation';
import type { State } from '../../common/types';
import theme from '../../common/themes/defaultTheme';
import Alert from '../components/Alert';
import loadingMessages from './loadingMessages';

const loadingImage = { uri: 'LaunchImage' };

type Props = {
  appOnline: boolean,
  navigation: any,
  isAuthenticated: boolean,
  loadingMessage: ?string,
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
    if (this.props.appOnline) {
      if (this.props.isAuthenticated) {
        this.navigateTo('home');
      } else {
        this.navigateTo('login');
      }
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

    const loadingMessage = this.props.loadingMessage ||
      sample(loadingMessages.splash);

    return (
      <View style={styles.loadingMessageContainer}>
        <Text style={styles.loadingMessage}>
          {loadingMessage}
        </Text>
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
    };
  }),
  graphql(
    gql`
    query SplashScreen {
      viewer {
        allQuotes {
          edges {
            node {
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
      }),
      props: ({ data }) => {
        const edges = path(['viewer', 'allQuotes', 'edges'], data);
        let loadingMessage;

        if (edges) {
          loadingMessage = sample(edges.map(edge => edge.node.text));
        }

        return {
          data,
          loadingMessage,
        };
      },
    },
  ),
)(SplashScreen);
