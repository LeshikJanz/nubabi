// @flow
// TODO: reuse HorizontalCardItem
import React from 'react';
import { StyleSheet } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import { compose } from 'ramda';
import { Box, Text, Overlay, withLayout } from '../components';

type Props = {
  title: string,
  image: { url: string },
};

// TODO: test the overlay is working as expected
export const ArticleCardItem = ({ title, image }: Props) => {
  return (
    <Box flex={1} borderRadius={4} overflow="hidden">
      <Image
        source={{ uri: image.url }}
        style={[{ flex: 1 }, StyleSheet.absoluteFill]}
        resizeMode="cover"
      />
      <Overlay />

      <Box
        justifyContent="center"
        style={() => ({
          shadowRadius: StyleSheet.hairlineWidth,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: -1,
          },
        })}
      >
        <Box justiyContent="center" alignItems="center" padding={0.5}>
          <Text
            color="secondary"
            style={() => ({ width: 100 })}
            numberOfLines={2}
            align="center"
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default compose(withLayout)(ArticleCardItem);
