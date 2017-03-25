import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, LayoutAnimation } from 'react-native';
import { NavigationActions } from 'react-navigation';
import type { State } from '../../common/types';
import theme from '../../common/themes/defaultTheme';

const loadingImage = require('../../common/images/loading7.png');

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

  componentDidUpdate() {
    if (this.props.appOnline) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

      if (this.props.isAuthenticated) {
        this.navigateTo('home');
      } else {
        this.navigateTo('login');
      }
    }
  }

  navigateTo = (routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={loadingImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
});

export default connect((state: State) => ({
  appOnline: state.app.online,
  isAuthenticated: state.auth.isAuthenticated,
}))(SplashScreen);
