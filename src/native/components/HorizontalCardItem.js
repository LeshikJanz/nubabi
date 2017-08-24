// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { StyleSheet } from 'react-native';
// TODO: restore
import { compose } from 'ramda';
import Box from './Box';
import Text from './Text';
import withLayout from './withLayout';
import HorizontalCardItemMedia from './HorizontalCardItemMedia';

export type Props = {
  title?: string,
  files?: Array<File>,
  icon?: string,
  layout: LayoutProps,
  containerStyle?: Function,
};

export const HorizontalCardItem = ({
  title,
  files,
  icon,
  layout,
  containerStyle,
}: Props) => {
  const mediaProps: Object = { layout };
  if (icon) {
    mediaProps.icon = icon;
  } else {
    mediaProps.image = files[0];
  }

  // TODO: remove image width style, not needed in ArticleCardItem, add flex
  return (
    <Box flex={1} borderRadius={4} overflow="hidden">
      <HorizontalCardItemMedia {...mediaProps} />

      {title &&
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
          <Box
            flex={1}
            justiyContent="center"
            alignItems="center"
            padding={0.5}
          >
            <Text
              style={() => ({ width: 100 })}
              numberOfLines={1}
              align="center"
            >
              {title}
            </Text>
          </Box>
        </Box>}
    </Box>
  );
};

export default compose(withLayout)(HorizontalCardItem);
