// @flow
import React from 'react';
import { View } from 'react-native';

type Props = {};

export const Video = ({ width, height }) => {
  return (
    <View
      style={{
        backgroundColor: 'orange',
        width,
        height,
      }}
    />
  );
};

export default Video;
