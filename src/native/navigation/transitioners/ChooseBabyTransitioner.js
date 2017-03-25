// @flow
import React from 'react';
import { CardStack } from 'react-navigation';
import type {
  NavigationSceneRendererProps,
  NavigationRoute,
  NavigationProp,
  NavigationAction,
  NavigationRouter,
} from 'react-navigation/src/TypeDefinition';

type Props = {
  navigation: NavigationProp<NavigationRoute, NavigationAction>,
  router: NavigationRouter,
}
const ChooseBabyTransitioner = ({ navigation, router }: Props) => {
  const transitionConfig = () => ({
    screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      const inputRange = [index - 1, index, index + 1];

      const opacity = position.interpolate({
        inputRange,
        outputRange: ([0.5, 0.9, 1]),
      });

      return {
        opacity,
      };
    },
  });

  return (
    <CardStack
      mode="card"
      navigation={navigation}
      router={router}
      transitionConfig={transitionConfig}
      headerMode="none"
    />
  );
};

export default ChooseBabyTransitioner;
