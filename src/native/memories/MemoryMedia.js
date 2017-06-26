// @flow
import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { head } from 'ramda';
import { Box, Overlay, withLayout } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {};

const RoundedContainer = ({ children }) => (
  <View
    style={{
      flex: 1,
      overflow: 'hidden',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    }}
  >
    {children}
  </View>
);
export const MemoryMedia = ({ files, layout }: Props) => {
  return files.edges.length > 1
    ? <MemoryMediaMultiple files={files} layout={layout} />
    : <MemoryMediaSingle media={head(files.edges).node} layout={layout} />;
};

export const MemoryMediaImage = ({ media, layout, small = false }) => {
  return (
    <RoundedContainer>
      <Image
        source={{ uri: media.url }}
        style={{
          flex: 1,
          height: small ? 60 : 180,
        }}
        resizeMode="cover"
      />
    </RoundedContainer>
  );
};

export const MemoryMediaVideo = ({ media, small }) => {
  // TODO: real video
  return (
    <Overlay>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={() => ({ height: small ? 40 : 180 })}
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
  return (
    <Box flex={1}>
      <Box
        flexDirection="row"
        flex={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {files.edges.map(file => (
          <Box
            flex={1}
            key={file.node.url}
            margin={0.5}
            borderRadius={4}
            style={() => ({ overflow: 'hidden' })}
          >
            <MemoryMediaSingle media={file.node} layout={layout} small />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default withLayout(MemoryMedia);
