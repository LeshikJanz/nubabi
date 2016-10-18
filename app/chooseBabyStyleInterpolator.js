function forChooseBaby(props) {
  const {
    layout,
    position,
    scene,
  } = props;

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const width = layout.initWidth;

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.3]),
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: ([1, 1, 0.95]),
  });

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange: ([width, 0, -10]),
  });

  return {
    opacity,
    transform: [
      { scale },
      { translateX },
      { translateY },
    ],
  };
}

module.exports = {
  forChooseBaby,
};
