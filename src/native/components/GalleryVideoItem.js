// @flow
import React, { Component } from 'react';
import { Dimensions, Image, View, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import Box from './Box';
import Overlay from './Overlay';
import Text from './Text';
import theme from '../../common/themes/defaultTheme';
import { formatDuration } from '../../common/helpers/formatDuration';
import GalleryVideoPlayer from './GalleryVideoPlayer';

type Props = {
  thumbnail: ?boolean,
  width: ?number,
  height: ?number,
  uri: ?string,
  lazyLoad: ?boolean,
  duration: ?number,
};

class GalleryVideoItem extends Component {
  props: Props;
  state = {
    progress: 0,
    disableGalleryGestures: false,
  };

  load() {
    this.setState({
      progress: 100,
    });
  }

  renderThumbnail() {
    const { width, height, uri, duration } = this.props;

    return (
      <View style={{ width, height }}>
        <Image
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
                <Text color="white">
                  {formatDuration(duration)}
                </Text>
              </Overlay>
            </View>
          </Overlay>
        </Image>
      </View>
    );
  }

  preventGalleryGestures = () => {
    console.log('on prevent gallery gestures');
    this.setState({
      disableGalleryGestures: true,
    });
  };

  player = null;

  isPlaying = () => {
    console.log(this.player && this.player.state.isPlaying);
    return this.player && this.player.state.isPlaying;
  };

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

    const videoProps = {
      width: sizeStyle.width,
      height: sizeStyle.height - 200,
      uri,
    };

    if (thumb) {
      videoProps.thumbnail = { uri: thumb };
      videoProps.endWithThumbnail = true;
    }

    const content =
      progress < 1 ? null : <GalleryVideoPlayer {...videoProps} />;

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

export default GalleryVideoItem;
