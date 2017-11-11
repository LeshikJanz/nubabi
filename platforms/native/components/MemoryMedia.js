// @flow
import type { File, FileConnection, LayoutProps } from 'core/types/index';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql } from 'react-apollo';
import { compose, head, take } from 'ramda';
import { connect } from 'react-redux';
import Box from './Box';
import Overlay from './Overlay';
import Text from './Text';
import withLayout from './withLayout';
import theme from 'core/themes/defaultTheme';
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
  onMediaPress?: (params: ?Object) => void,
};

type MemoryMediaImageProps = MemoryMediaSingleProps & {
  small?: boolean,
  style?: Object | number,
  displayMoreIndicator?: React.Element,
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
  isMemoryTypeDisplayed?: boolean,
};

export const RoundedContainer = ({
  children,
  style,
  onPress,
  isDetailed,
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
          alignSelf: 'stretch',
          overflow: 'hidden',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomLeftRadius: isDetailed ? 4 : 0,
          borderBottomRightRadius: isDetailed ? 4 : 0,
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
  isDetailed,
}: MemoryMediaImageProps) => {
  const imageSource = media.thumb || media;

  return (
    <RoundedContainer
      style={style}
      onPress={onMediaPress}
      isDetailed={isDetailed}
    >
      <Image
        source={{ uri: imageSource.url }}
        style={{
          flex: 1,
          minHeight: small ? 80 : 180,
        }}
        resizeMode="cover"
      >
        {displayMoreIndicator && <Overlay>{displayMoreIndicator}</Overlay>}
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
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={() => ({ height: small ? 80 : 180 })}
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
      {media.thumb ? (
        <Image
          source={{ uri: media.thumb.url }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {content}
        </Image>
      ) : (
        content
      )}
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
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={() => ({ height: small ? 80 : 180 })}
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
      {media.thumb ? (
        <Image
          source={{ uri: media.thumb.url }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {content}
        </Image>
      ) : (
        content
      )}
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
  suggestedMemoryType,
}: MemoryMediaMultipleProps) => {
  const displayLimit = suggestedMemoryType ? 2 : 3;

  const shouldDisplayMoreButton = files.count > displayLimit;

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
        paddingBottom: 5,
      })}
    >
      <Text bold color="white" size={8} align="center">
        + {files.count - displayLimit + 1}
      </Text>
      <Text bold color="white" size={2} align="center">
        more
      </Text>
    </Box>
  );

  return (
    <Box flex={1}>
      <Box flexDirection="row" flex={1} justifyContent="space-between">
        {suggestedMemoryType && (
          <Box
            flex={1}
            key="memory-type"
            borderRadius={4}
            borderColor="separator"
            borderWidth={1}
            alignItems="center"
            justifyContent="center"
            style={() => ({
              overflow: 'hidden',
              marginHorizontal: 10,
              marginVertical: 8,
            })}
          >
            <Image
              source={suggestedMemoryType.image}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </Box>
        )}
        {take(
          shouldDisplayMoreButton ? displayLimit - 1 : displayLimit,
          files.edges,
        ).map((file, index) => (
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
          </Box>
        ))}

        {shouldDisplayMoreButton && (
          <Box
            flex={1}
            key="more"
            margin={0.5}
            borderRadius={4}
            style={() => ({ overflow: 'hidden' })}
          >
            <MemoryMediaSingle
              media={files.edges[displayLimit].node}
              layout={layout}
              small
              displayMoreIndicator={displayMore}
              onMediaPress={() => onMediaPress({ grid: true })}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const MemoryMedia = ({
  files,
  layout,
  openGallery,
  suggestedMemoryType,
  isDetailed = false,
}: Props) => {
  if (files.edges.length > 1 || suggestedMemoryType) {
    return (
      <MemoryMediaMultiple
        files={files}
        layout={layout}
        onMediaPress={openGallery}
        suggestedMemoryType={suggestedMemoryType}
      />
    );
  }

  return (
    <MemoryMediaSingle
      media={head(files.edges).node}
      layout={layout}
      onMediaPress={() => openGallery({})}
      isDetailed={isDetailed}
    />
  );
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
