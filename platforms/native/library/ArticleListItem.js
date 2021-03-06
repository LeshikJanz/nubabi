// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { CachedImage as Image } from 'react-native-cached-image';
import { gql } from 'react-apollo';
import { compose, path } from 'ramda';
import { Box, Overlay, Text, withLayout } from '../components';

type Props = {
  title: string,
  image?: { url: string },
};

export const ArticleListItem = ({ title, image }: Props) => {
  const imageSource = path(['url'], image);
  return (
    <Box
      flexDirection="row"
      flex={1}
      borderTopLeftRadius={4}
      borderBottomLeftRadius={4}
      overflow="hidden"
    >
      {imageSource && (
        <Image
          source={{ uri: imageSource }}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <Overlay />
        </Image>
      )}

      <Box
        flex={2}
        padding={1}
        alignItems="flex-start"
        justifyContent="center"
        style={() => ({ flex: 2 })}
      >
        <Box justiyContent="center" alignItems="center" padding={0.5}>
          <Text size={2} numberOfLines={4}>
            {title}
          </Text>
        </Box>
      </Box>

      <Box alignItems="center" justifyContent="center" padding={1}>
        <Icon name="ios-arrow-forward" size={20} color="#C5CDD7" />
      </Box>
    </Box>
  );
};

ArticleListItem.fragments = {
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

export default compose(withLayout)(ArticleListItem);
