import React, { Component } from 'react';
import { StyleSheet, View, Image, LayoutAnimation, Text } from 'react-native';
import { connect } from 'react-redux';
import { sample } from 'lodash';
import { NavigationActions } from 'react-navigation';
import type { State } from '../../common/types';
import theme from '../../common/themes/defaultTheme';
import loadingMessages from './loadingMessages';

const loadingImage = { uri: 'LaunchImage' };

type Props = {
  appOnline: boolean,
  navigation: any,
  isAuthenticated: boolean,
};

class SplashScreen extends Component {
  props: Props;

  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  componentDidMount() {
    // Required since react-navigation pushes this route after logout for some reason
    this.handleNextScreen();
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.spring,
      duration: 400,
    });

    this.handleNextScreen();
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

  navigateTo = (routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  renderLoadingMessage() {
    return (
      <View style={styles.loadingMessageContainer}>
        <Text style={styles.loadingMessage}>
          {sample(loadingMessages.splash)}
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

export default connect((state: State) => ({
  appOnline: state.app.online,
  isAuthenticated: state.auth.isAuthenticated,
}))(SplashScreen);
