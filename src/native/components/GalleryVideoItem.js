// @flow
import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Box from './Box';
import Overlay from './Overlay';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../common/themes/defaultTheme';
import VideoPlayer from 'react-native-video-player';

type Props = {
  thumbnail: ?boolean,
  width: ?number,
  height: ?number,
  uri: ?string,
  lazyLoad: ?boolean,
};

const thumb = require('../../common/images/thumbnail.png'); // TODO

class GalleryVideoItem extends Component {
  props: Props;
  state = {
    progress: 0,
  };

  load() {
    this.setState({
      progress: 100,
    });
  }

  renderThumbnail() {
    const { width, height, thumbnail, uri } = this.props;

    return (
      <View style={{ width, height }}>
        <Image
          source={thumb}
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
                <Text color="white">00:00</Text>
              </Overlay>
            </View>
          </Overlay>
        </Image>
      </View>
    );
  }

  render() {
    const { thumbnail, width, height, uri } = this.props;

    if (thumbnail) {
      return this.renderThumbnail();
    }

    const screen = Dimensions.get('window');

    const sizeStyle = {
      width: width || screen.width,
      height: height || screen.height,
    };

    const { progress } = this.state;

    const content =
      progress < 1
        ? null
        : <VideoPlayer
            thumbnail={thumb}
            endWithThumbnail
            video={{ uri }}
            videoWidth={sizeStyle.width}
            videoHeight={sizeStyle.height - 200}
          />;

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
