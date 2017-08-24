// @flow
// TODO: reuse HorizontalCardItem
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-cached-image';
import { gql } from 'react-apollo';
import { compose } from 'ramda';
import { Box, Text, Overlay, withLayout } from '../components';

type Props = {
  title: string,
  image: { url: string },
  layout: LayoutProps,
};

export const ArticleCardItem = ({ title, image, layout }: Props) => {
  return (
    <Box flex={1} borderRadius={4} overflow="hidden">
      <Image source={{ uri: image.url }} style={{ flex: 1 }} resizeMode="cover">
        <Overlay />
      </Image>

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

ArticleCardItem.fragments = {
  item: gql`
    fragment ArticleListItem on Article {
      id
      title
      image {
        url
      }
    }
  `,
};

export default compose(withLayout)(ArticleCardItem);
