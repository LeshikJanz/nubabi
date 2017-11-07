// @flow
import React, { Component } from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { compose } from 'ramda';
import Box from './Box';
import Overlay from './Overlay';
import Text from './Text';
import theme from '../../common/themes/defaultTheme';
import { formatDuration } from '../../common/helpers/formatDuration';
import GalleryAudioPlayer from './GalleryAudioPlayer';

type Props = {
  thumbnail: ?boolean,
  width: ?number,
  height: ?number,
  uri: ?string,
  lazyLoad: ?boolean,
  duration: ?number,
  thumb?: string,
};

class GalleryAudioItem extends Component {
  props: Props;
  state = {
    progress: 0,
    disableGalleryGestures: false,
    isPlaying: false,
  };

  load() {
    this.setState({
      progress: 100,
    });
  }

  preventGalleryGestures = () => {
    this.setState({
      disableGalleryGestures: true,
    });
  };

  isPlaying = () => {
    return this.state.isPlaying;
  };

  renderThumbnail() {
    const { width, height, uri, duration } = this.props;

    return (
      <View style={{ width, height }}>
        <ImageBackground
          source={{ uri }}
          style={{ flex: 1, width, height, resizeMode: 'cover' }}
        >
          <Overlay>
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
            <View style={{ position: 'absolute', bottom: 0, right: 5 }}>
              <Overlay>
                <Text color="white">{formatDuration(duration)}</Text>
              </Overlay>
            </View>
          </Overlay>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const {
      thumbnail: isThumbnailView,
      width,
      height,
      uri,
      duration,
      thumb,
    } = this.props;

    if (isThumbnailView) {
      return this.renderThumbnail();
    }

    const screen = Dimensions.get('window');

    const sizeStyle = {
      width: width || screen.width,
      height: height || screen.height,
    };

    const { progress } = this.state;

    const audioProps: Object = {
      width: sizeStyle.width,
      height: sizeStyle.height - 200,
      uri,
    };

    if (thumb) {
      audioProps.thumbnail = { uri: thumb };
    }

    const content =
      progress < 1 ? null : <GalleryAudioPlayer {...audioProps} />;

    return (
      <View
        style={{
          flex: 1,
          ...sizeStyle,
          justifyContent: 'center',
        }}
      >
        {content}
      </View>
    );
  }
}

export default GalleryAudioItem;
