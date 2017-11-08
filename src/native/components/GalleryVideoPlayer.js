// @flow
import React, { PureComponent } from 'react';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { toggleGalleryScroll } from '../../common/ui/reducer';

type Props = {
  uri: string,
  width: number,
  height: number,
  toggleGalleryScroll: typeof toggleGalleryScroll,
};

export class GalleryVideoPlayer extends PureComponent {
  props: Props;
  state = {
    isPlaying: false,
  };

  componentDidMount() {
    Orientation.addOrientationListener(this.handleOrientationChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.handleOrientationChange);
  }

  player = null;

  handleOrientationChange = orientation => {
    if (!this.player) {
      return;
    }

    if (this.player.state.isPlaying) {
      this.player.onToggleFullScreen();
    }
  };

  allowGalleryGestures = () => {
    this.props.toggleGalleryScroll(true);
  };

  preventGalleryGestures = () => {
    this.props.toggleGalleryScroll(false);
  };

  onPlayPress = () => {
    const { player } = this;

    if (!player) {
      return;
    }

    // react-native-video-player hasn't updated the state at this point, so we implicitly negate
    this.props.toggleGalleryScroll(player.state.isPlaying);
  };

  render() {
    const { uri, width, height, ...extraProps } = this.props;

    return (
      <VideoPlayer
        ref={ref => (this.player = ref)}
        video={{ uri }}
        videoWidth={width}
        videoHeight={height}
        onPlayPress={this.onPlayPress}
        onStart={this.preventGalleryGestures}
        onEnd={this.allowGalleryGestures}
        {...extraProps}
      />
    );
  }
}

export default compose(
  connect(null, {
    toggleGalleryScroll,
  }),
)(GalleryVideoPlayer);
