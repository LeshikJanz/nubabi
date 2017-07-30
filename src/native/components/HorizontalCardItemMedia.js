// @flow
import type { File, LayoutProps } from '../../common/types';
import React from 'react';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from './Box';
import Overlay from './Overlay';
import theme from '../../common/themes/defaultTheme';
import { MemoryMediaSingle } from './MemoryMedia';

type Props = {
  icon?: string,
  image?: File,
  layout: LayoutProps,
};

export const HorizontalCardItemMedia = ({ icon, image, layout }: Props) => {
  console.log(image);
  if (image) {
    if (image.contentType && !image.contentType.startsWith('image')) {
      return (
        <MemoryMediaSingle
          media={image}
          style={{ width: layout.parentWidth, height: 80, overflow: 'hidden' }}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: image.url }}
          style={{ width: layout.parentWidth, height: 80, flex: 1 }}
          resizeMode="cover"
        >
          <Overlay />
        </Image>
      );
    }
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
