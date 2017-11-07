// @flow
import React from 'react';
import { Image } from 'react-native';
import { compose } from 'ramda';
import { withHandlers } from 'recompose';
import { Box, Card, Text } from '../components';

type Props = {
  title: string,
  image: number,
  imageSize?: number,
  onAddSuggestedMemory: () => void,
};

export const SuggestedMemory = ({
  title,
  image,
  imageSize = 60,
  onAddSuggestedMemory,
}: Props) => {
  return (
    <Card
      margin={0}
      padding={1}
      onPress={onAddSuggestedMemory}
      style={() => ({
        width: 115,
        height: 120,
      })}
    >
      <Box alignItems="center" justifyContent="center" paddingBottom={1}>
        <Image
          source={image}
          style={{ width: imageSize, height: imageSize }}
          resizeMode="cover"
        />
      </Box>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text color="secondary" align="center">
          {title}
        </Text>
      </Box>
    </Card>
  );
};

export default compose(
  withHandlers({
    onAddSuggestedMemory: ({ onAddMemory, id }) => () => onAddMemory(id),
  }),
)(SuggestedMemory);
