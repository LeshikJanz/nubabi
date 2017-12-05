// @flow
import React from 'react';
import { CardStackTransitioner } from 'react-navigation';
import type {
  NavigationProp,
  NavigationRouter,
  NavigationSceneRendererProps,
} from 'react-navigation/src/TypeDefinition';

export default {
  headerMode: 'float',

  transitionConfig: () => ({
    screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      const inputRange = [0, 0.5, 1];

      const opacity = position.interpolate({
        inputRange,
        outputRange: [1, 1, 0.9],
      });

      return {
        opacity,
      };
    },
  }),
};
