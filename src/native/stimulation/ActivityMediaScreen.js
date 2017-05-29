// @flow
import type { ActivityMediaConnection } from '../../common/types';
import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';

type Props = {
  media: ActivityMediaConnection,
};

class ActivityMediaScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    mode: 'modal',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
  };

  getMediaList() {
    return this.props.navigation.state.params.media.edges
      .filter(edge => edge.node && edge.node.type === 'IMAGE')
      .map(edge => ({
        thumb: edge.node.thumb,
        photo: edge.node.url,
      }));
  }

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <PhotoBrowser
        mediaList={this.getMediaList()}
        displayNavArrows
        enableGrid
        useCircleProgress
      />
    );
  }
}

export default ActivityMediaScreen;
