// @flow
import type {
  File,
  FileConnection,
  LayoutProps,
} from '../../common/types/index';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql } from 'react-apollo';
import { compose, head, take } from 'ramda';
import { connect } from 'react-redux';
import Box from './Box';
import Overlay from './Overlay';
import Text from './Text';
import withLayout from './withLayout';
import theme from '../../common/themes/defaultTheme';
import { navigate } from '../navigation/actions';

type Props = {
  files: FileConnection,
  layout: LayoutProps,
  openGallery: (params: ?Object) => void,
};

type RoundedContainerProps = {
  children: any,
  style?: Object | number,
  onPress?: () => void,
};

type MemoryMediaSingleProps = {
  media: File,
  onMediaPress: (params: ?Object) => void,
};

type MemoryMediaImageProps = MemoryMediaSingleProps & {
  small?: boolean,
  style?: Object | number,
  displayMoreIndicator?: boolean,
};

type MemoryMediaVideoProps = MemoryMediaSingleProps & {
  small?: boolean,
  displayMoreIndicator?: boolean,
};

type MemoryMediaUnknownProps = {};

type MemoryMediaMultipleProps = {
  files: FileConnection,
  layout: LayoutProps,
  onMediaPress: (params: ?Object) => void,
};

const RoundedContainer = ({
  children,
  style,
  onPress,
}: RoundedContainerProps) => {
  let Container;
  const containerProps = {};

  if (onPress) {
    Container = TouchableOpacity;
    containerProps.onPress = onPress;
  } else {
    Container = View;
  }

  return (
    <Container
      style={[
        {
          flex: 1,
          overflow: 'hidden',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
        style,
      ]}
      {...containerProps}
    >
      {children}
    </Container>
  );
};

export const MemoryMediaImage = ({
  media,
  layout,
  small = false,
  style,
  displayMoreIndicator,
  onMediaPress,
}: MemoryMediaImageProps) => {
  const imageSource = media.thumb || media;

  return (
    <RoundedContainer style={style} onPress={onMediaPress}>
      <Image
        source={{ uri: imageSource.url }}
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

export const MemoryMediaAudio = ({
  media,
  small,
  style = {},
  displayMoreIndicator,
  onMediaPress,
}: MemoryMediaVideoProps) => {
  const content = (
    <Overlay style={style}>
      <Box
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
  const containerProps = { flex: 1 };

  if (onMediaPress) {
    containerProps.as = TouchableOpacity;
    containerProps.onPress = onMediaPress;
  }

  return (
    <Box {...containerProps}>
      {media.thumb
        ? <Image
            source={{ uri: media.thumb.url }}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
            {content}
          </Image>
        : content}
    </Box>
  );
};

export const MemoryMediaVideo = ({
  media,
  small,
  style = {},
  displayMoreIndicator,
  onMediaPress,
}: MemoryMediaVideoProps) => {
  const content = (
    <Overlay style={style}>
      <Box
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
  const containerProps = { flex: 1 };

  if (onMediaPress) {
    containerProps.as = TouchableOpacity;
    containerProps.onPress = onMediaPress;
  }

  return (
    <Box {...containerProps}>
      {media.thumb
        ? <Image
            source={{ uri: media.thumb.url }}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
            {content}
          </Image>
        : content}
    </Box>
  );
};

export const MemoryMediaUnknown = ({
  media,
  small,
}: MemoryMediaUnknownProps) => {
  return null; // TODO
};

export const MemoryMediaSingle = (props: MemoryMediaSingleProps) => {
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
    case 'audio': {
      MediaComponent = MemoryMediaAudio;
      break;
    }
    default: {
      MediaComponent = MemoryMediaUnknown;
    }
  }

  return <MediaComponent {...props} />;
};

export const MemoryMediaMultiple = ({
  files,
  layout,
  onMediaPress,
}: MemoryMediaMultipleProps) => {
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
            <MemoryMediaSingle
              media={file.node}
              layout={layout}
              small
              onMediaPress={() => onMediaPress({ selectedIndex: index })}
            />
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
              onMediaPress={() => onMediaPress({ grid: true })}
            />
          </Box>}
      </Box>
    </Box>
  );
};

export const MemoryMedia = ({ files, layout, openGallery }: Props) => {
  if (files.edges.length > 1) {
    return (
      <MemoryMediaMultiple
        files={files}
        layout={layout}
        onMediaPress={openGallery}
      />
    );
  } else {
    return (
      <MemoryMediaSingle
        media={head(files.edges).node}
        layout={layout}
        onMediaPress={() => openGallery({})}
      />
    );
  }
};

export const fragments = {
  files: gql`
    fragment MemoryMediaFile on File {
      id
      contentType
      url
    }
  `,
};

MemoryMedia.fragments = fragments;

export default compose(
  connect(null, (dispatch, { files, media }) => ({
    openGallery: (params = {}) => {
      dispatch(navigate('gallery', { ...params, files }));
    },
  })),
  withLayout,
)(MemoryMedia);
