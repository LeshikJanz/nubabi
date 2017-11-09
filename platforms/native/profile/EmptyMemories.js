// @flow
import type { LayoutProps } from '../../../core/types';
import React from 'react';
import { Image } from 'react-native';
import { Box, Button, Card, Text } from '../components';
import HeaderShape from '../stimulation/HeaderShape';
import withLayout from '../components/withLayout';
import getHeaderStyles from '../stimulation/getHeaderStyles';

type Props = {
  babyName: string,
  onNavigateToMemories: () => void,
  layout: LayoutProps,
};

const emptyMemoriesImage = require('../../../core/images/empty-memories.png');

export const EmptyMemories = ({
  babyName,
  onNavigateToMemories,
  layout,
}: Props) => {
  const width = layout.viewportWidth;
  const {
    headerContainerStyle,
    headerImageStyle,
    overlayStyle,
  } = getHeaderStyles(width);

  return (
    <Box contentSpacing>
      <Card padding={0}>
        <Box style={() => ({ backgroundColor: '#F8F9FC' })}>
          <Box
            alignItems="center"
            justifyContent="center"
            style={() => ({ top: 40 })}
          >
            <Image
              source={emptyMemoriesImage}
              style={{ width: 36, height: 35 }}
              resizeMode="contain"
            />
            <Text marginTop={0.5} size={6}>
              Recent Memories
            </Text>
          </Box>

          <HeaderShape width={width - 20} />
        </Box>

        <Box
          contentSpacing
          alignItems="center"
          style={() => ({ backgroundColor: '#fff', marginTop: -10 })}
        >
          <Text color="secondary">
            Upload voice notes, videos and photos of {babyName} to Memories and
            they'll display here for you to enjoy.
          </Text>

          <Box marginTop={1}>
            <Button
              padding={1}
              paddingVertical={0.5}
              onPress={onNavigateToMemories}
              backgroundColor="primary"
              color="white"
            >
              <Text medium color="white">
                GO TO MEMORIES
              </Text>
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default withLayout(EmptyMemories);
