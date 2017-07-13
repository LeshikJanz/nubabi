// @flow
import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { head, take } from 'ramda';
import { Box, Overlay, Text, withLayout } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {};

type RoundedContainerProps = {
  children: any,
  style: Object | number,
};

const RoundedContainer = ({ children, style }: RoundedContainerProps) =>
  <View
    style={[
      {
        flex: 1,
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
      style,
    ]}
  >
    {children}
  </View>;

export const MemoryMedia = ({ files, layout }: Props) => {
  return files.edges.length > 1
    ? <MemoryMediaMultiple files={files} layout={layout} />
    : <MemoryMediaSingle media={head(files.edges).node} layout={layout} />;
};

export const MemoryMediaImage = ({
  media,
  layout,
  small = false,
  style,
  displayMoreIndicator,
}) => {
  return (
    <RoundedContainer style={style}>
      <Image
        source={{ uri: media.url }}
        style={{
          flex: 1,
          height: small ? 60 : 180,
        }}
        resizeMode="cover"
      >
        {displayMoreIndicator &&
          <Overlay>
            {displayMoreIndicator}
          </Overlay>}
      </Image>
    </RoundedContainer>
  );
};

export const MemoryMediaVideo = ({ media, small, displayMoreIndicator }) => {
  // TODO: real video
  return (
    <Overlay>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={() => ({ height: small ? 60 : 180 })}
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
            style={{ marginLeft: 5, marginTop: 2 }}
            name="ios-play"
            color={theme.colors.primary}
          />
        </Box>
      </Box>
      {displayMoreIndicator}
    </Overlay>
  );
};

export const MemoryMediaUnknown = ({ media, small }) => {
  return null; // TODO
};

export const MemoryMediaSingle = props => {
  let MediaComponent;
  switch (props.media.contentType.split('/')[0]) {
    case 'video': {
      MediaComponent = MemoryMediaVideo;
      break;
    }
    case 'image': {
      MediaComponent = MemoryMediaImage;
      break;
    }
    default: {
      MediaComponent = MemoryMediaUnknown;
    }
  }

  return <MediaComponent {...props} />;
};

export const MemoryMediaMultiple = ({ files, layout }) => {
  const shouldDisplayMoreButton = files.edges.length >= 3;

  const displayMore = (
    <Box
      style={() => ({
        flex: 1,
        position: 'relative',
        top: 0,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Text bold color="white" size={8} align="center">
        + {files.count - 2}
      </Text>
      <Text bold color="white" size={2} align="center">
        more
      </Text>
    </Box>
  );

  return (
    <Box flex={1}>
      <Box
        flexDirection="row"
        flex={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {take(2, files.edges).map((file, index) =>
          <Box
            flex={1}
            key={`${index}-${file.node.url}`}
            margin={0.5}
            borderRadius={4}
            style={() => ({ overflow: 'hidden' })}
          >
            <MemoryMediaSingle media={file.node} layout={layout} small />
          </Box>,
        )}

        {shouldDisplayMoreButton &&
          <Box
            flex={1}
            key="more"
            margin={0.5}
            borderRadius={4}
            style={() => ({ overflow: 'hidden' })}
          >
            <MemoryMediaSingle
              media={files.edges[2].node}
              layout={layout}
              small
              displayMoreIndicator={displayMore}
            />
          </Box>}
      </Box>
    </Box>
  );
};

export default withLayout(MemoryMedia);
