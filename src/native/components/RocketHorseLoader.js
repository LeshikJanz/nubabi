// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from 'color';
import RocketHorse from './RocketHorse';
import theme from '../../common/themes/defaultTheme';

type Props = {
  splash: boolean,
};

Animatable.initializeRegistryWithDefinitions({
  rotatingHorse: {
    0: {
      transform: [{ rotate: '0deg' }],
    },
    0.4: {
      transform: [{ rotate: '-30deg' }],
    },
    0.6: {
      transform: [{ rotate: '0deg' }],
    },
    0.8: {
      transform: [{ rotate: '30deg' }],
    },
    1: {
      transform: [{ rotate: '0deg' }],
    },
  },
});

export class RocketHorseLoader extends PureComponent {
  props: Props;

  static defaultProps: Props = {
    splash: false,
  };

  renderLoader() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.View
          useNativeDriver
          iterationCount="infinite"
          animation="rotatingHorse"
          easing="ease"
          duration={1500}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            backgroundColor: Color(theme.colors.primary).alpha(0.5),
            borderRadius: 50 * 2,
          }}
        >
          <RocketHorse width={30} height={30} />
        </Animatable.View>
      </View>
    );
  }

  renderLoaderContent() {
    return (
      <Animatable.View
        useNativeDriver
        iterationCount="infinite"
        animation="rotatingHorse"
        easing="ease"
        duration={1500}
      >
        <RocketHorse />
      </Animatable.View>
    );
  }

  render() {
    const { splash } = this.props;

    return splash ? this.renderLoaderContent() : this.renderLoader();
  }
}

export default RocketHorseLoader;
