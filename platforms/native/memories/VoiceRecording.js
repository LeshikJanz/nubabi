// @flow
import React, { PureComponent } from 'react';
// eslint-disable-next-line react-native/split-platform-components
import { LayoutAnimation, PermissionsAndroid, Platform } from 'react-native';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import uuid from 'react-native-uuid';
import { change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose, last } from 'ramda';
import { Box, FAB, Icon, Loader, SubmitButton, Text } from '../components';
import theme from '../../../core/themes/defaultTheme';
import { formatDuration } from '../../../core/helpers/formatDuration';

type Props = {
  goBack: () => void,
};

export class VoiceRecording extends PureComponent {
  props: Props;
  state = {
    isSubmitting: false,
    isPlaying: false,
    isRecording: false,
    finished: false,
    stoppedRecording: undefined,
    audioPath: this.getAudioPath(),
    sound: null,
    duration: 0,
    hasPermission: undefined,
  };

  componentDidMount() {
    this.initializeRecording();
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  componentWillUnmount() {
    if (this.state.sound) {
      this.state.sound.release();
    }
  }

  getAudioPath() {
    return `${AudioUtils.DocumentDirectoryPath}/${uuid.v4()}.aac`;
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  initializeRecording = () => {
    this.checkPermission().then(hasPermission => {
      this.setState({ hasPermission });

      if (!hasPermission) {
        return;
      }

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = data => {
        this.setState({ duration: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = data => {
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === 'OK', data.audioFileURL);
        }
      };
    });
  };

  toggleRecording = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.record();
    }
  };

  pauseRecording = async () => {
    if (!this.state.isRecording) {
      return;
    }

    this.setState({ stoppedRecording: true, isRecording: false });

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android
      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  stopRecording = async () => {
    if (!this.state.isRecording) {
      return;
    }

    this.setState({ stoppedRecording: true, isRecording: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }

      return filePath;
    } catch (error) {
      console.log(error);
    }
  };

  play = async () => {
    if (this.state.isRecording) {
      await this.stopRecording();
    }

    // https://github.com/zmxv/react-native-sound/issues/89
    setTimeout(() => {
      this.setState(
        {
          isPlaying: true,
          sound: new Sound(this.state.audioPath, '', error => {
            if (error) {
              console.log('failed to load the source', error);
            }
          }),
        },
        () => {
          setTimeout(() => {
            this.state.sound.play(success => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoder errors');
              }

              this.setState({ isPlaying: false });
            }, 100);
          }, 100);
        },
      );
    });
  };

  record = async () => {
    if (this.state.isRecording) {
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Cant record, no permissions');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ isRecording: true });

    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  };

  finishRecording(didSucceed: boolean, filePath: string) {
    this.setState({ finished: didSucceed });
    console.log(
      'finished recording of duration',
      this.state.duration,
      'at path',
      filePath,
    );
  }

  reset = async () => {
    if (this.state.isRecording) {
      await this.stopRecording();
    }

    if (this.state.isPlaying && this.state.sound) {
      this.state.sound.stop();
      this.state.sound.release();
    }

    // TODO: how to delete the file?
    this.setState(
      {
        duration: 0,
        sound: null,
        audioPath: this.getAudioPath(),
      },
      () => {
        this.prepareRecordingPath(this.state.audioPath);
      },
    );
  };

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'Microphone Permission',
      message:
        'Nubabi needs to access to your microphone so you can record audio',
    };

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then(result => {
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  handleSubmit = () => {
    this.props.change('memory', 'files', [
      ...this.props.files,
      {
        contentType: 'audio/aac',
        name: last(this.state.audioPath.split('/')),
        url: this.state.audioPath,
      },
    ]);
    this.props.goBack();
  };

  render() {
    const { isRecording, isSubmitting, isPlaying } = this.state;
    const hasRecording = !isRecording && this.state.duration > 0;

    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {hasRecording && (
            <FAB onPress={this.play}>
              <Icon
                name={isPlaying ? 'ios-square' : 'ios-play'}
                size={30}
                color={
                  isPlaying ? theme.colors.primary : theme.colors.secondary
                }
                style={isPlaying ? {} : { paddingLeft: 5, paddingTop: 5 }}
              />
            </FAB>
          )}

          <Box marginHorizontal={2}>
            <FAB size={100} onPress={this.toggleRecording}>
              <Icon
                name={isRecording ? 'ios-square' : 'ios-mic'}
                size={40}
                color={
                  isPlaying ? theme.colors.secondary : theme.colors.primary
                }
              />
            </FAB>
            {isRecording && (
              <Loader
                size={130}
                style={{ position: 'absolute', top: -15, left: -15 }}
              />
            )}
          </Box>

          {hasRecording && (
            <FAB onPress={this.reset}>
              <Icon
                name="ios-refresh"
                size={35}
                style={{ paddingTop: 5 }}
                color={theme.colors.secondary}
              />
            </FAB>
          )}
        </Box>

        <Box alignItems="center">
          <Text
            alignSelf="center"
            medium
            size={8}
            color={isRecording ? 'primary' : 'secondary'}
            align="left"
            margin={0}
            padding={0}
            width={5}
            style={() => ({ letterSpacing: 2 })}
            adjustFontSizeToFit
            paddingLeft={0.5}
          >
            {formatDuration(this.state.duration)}
          </Text>
        </Box>

        <Box marginVertical={2}>
          <Text size={1} medium align="center" color="secondary">
            Record a voice note to capture
          </Text>
          <Text
            marginVertical={0.5}
            size={1}
            medium
            color="secondary"
            align="center"
          >
            the moment with audio
          </Text>
        </Box>
        <SubmitButton
          style={{ justifyContent: 'flex-end', marginBottom: 20 }}
          disabled={!hasRecording}
          loading={isSubmitting}
          onPress={this.handleSubmit}
        />
      </Box>
    );
  }
}

const selector = formValueSelector('memory');

export default compose(
  connect(
    (state: State) => ({
      files: selector(state, 'files'),
    }),
    {
      change,
    },
  ),
)(VoiceRecording);
