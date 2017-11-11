// @flow
import type { File, Image as ImageType, LayoutProps } from 'core/types';
import React from 'react';
import { CachedImage as Image } from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { prop, propOr } from 'ramda';
import Box from './Box';
import Overlay from './Overlay';
import theme from 'core/themes/defaultTheme';
import { MemoryMediaSingle } from './MemoryMedia';

type Props = {
  icon?: string,
  image?: ImageType,
  layout: LayoutProps,
};

export const HorizontalCardItemMedia = ({ icon, image, layout }: Props) => {
  if (image) {
    if (image.contentType && !image.contentType.startsWith('image')) {
      return (
        <MemoryMediaSingle
          media={image}
          style={{ width: layout.parentWidth, height: 80, overflow: 'hidden' }}
        />
      );
    }

    const imageSource = image.thumb || image;

    return (
      <Image
        source={{ uri: imageSource.url }}
        style={{ width: layout.parentWidth, height: 80, flex: 1 }}
        resizeMode="cover"
      >
        <Overlay />
      </Image>
    );
  }

  if (icon) {
    return (
      <Overlay>
        <Box
          flex={1}
          style={() => ({ height: 80 })}
          alignItems="center"
          justifyContent="center"
          borderRadius={4}
        >
          <Box
            borderRadius={20}
            backgroundColor="white"
            style={() => ({ width: 40, height: 40, overflow: 'hidden' })}
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              size={30}
              style={{ textAlign: 'center' }}
              name={icon}
              color={theme.colors.gray}
            />
          </Box>
        </Box>
      </Overlay>
    );
  }

  return null;
};

export default HorizontalCardItemMedia;
