// @flow
import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import Box from './Box';
import FAB from './FAB';
import theme from '../../common/themes/defaultTheme';

type Props = {};

class GalleryAudioPlayer extends PureComponent {
  props: Props;

  state = {
    isPlaying: false,
    sound: null,
  };

  componentDidMount() {
    this.initializeSound();
  }

  componentWillUnmount() {
    if (this.state.sound) {
      this.state.sound.release();
    }
  }

  initializeSound = () => {
    Sound.setCategory('Playback');

    this.setState({
      sound: new Sound(
        this.props.uri,
        '',
        (error, sound) => {
          console.log('error', error, sound);
        },
        {
          preserveEncoding: true,
        },
      ),
    });
  };

  play = () => {
    this.setState({ isPlaying: true }, () => this.state.sound.play());
  };

  pause = () => {
    this.setState({ isPlaying: false }, () => this.state.sound.pause());
  };

  togglePlaying = () => {
    return this.state.isPlaying ? this.pause() : this.play();
  };

  render() {
    const { isPlaying } = this.state;
    return (
      <Box alignItems="center" justifyContent="center">
        <FAB onPress={this.togglePlaying}>
          <Icon
            name={isPlaying ? 'ios-square' : 'ios-play'}
            color={theme.colors.primary}
            size={40}
            style={isPlaying ? {} : { paddingLeft: 5, paddingTop: 5 }}
          />
        </FAB>
      </Box>
    );
  }
}

export default GalleryAudioPlayer;
