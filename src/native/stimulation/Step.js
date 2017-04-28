// @flow
import React from 'react';
import { Box, Text } from '../components/index';

type Props = {
  number: number,
  title?: string,
  text: string,
  media?: Object,
};

export const Step = (props: Props) => {
  return <Text>{props.text}</Text>;
};

export default Step;
