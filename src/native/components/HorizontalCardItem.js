// @flow
import type { LayoutProps, File } from '../../common/types';
import React from 'react';
import { StyleSheet } from 'react-native';
// TODO: restore
import Image from 'react-native-cached-image';
import { compose } from 'ramda';
import Box from './Box';
import Text from './Text';
import Overlay from './Overlay';
import withLayout from './withLayout';

export type Props = {
  title: string,
  files: Array<File>,
  layout: LayoutProps,
};

export const HorizontalCardItem = ({ title, files, layout }: Props) => {
  const image = files[0]; // TODO: support video

  // TODO: remove image width style, not needed in ArticleCardItem, add flex
  return (
    <Box flex={1} borderRadius={4} overflow="hidden">
      <Image
        source={{ uri: image.url }}
        style={{ width: layout.parentWidth, height: 80 }}
        resizeMode="cover"
      >
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
        <Box flex={1} justiyContent="center" alignItems="center" padding={0.5}>
          <Text style={() => ({ width: 100 })} numberOfLines={2} align="center">
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default compose(withLayout)(HorizontalCardItem);
