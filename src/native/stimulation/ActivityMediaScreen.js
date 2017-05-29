// @flow
import type { ActivityMediaConnection } from '../../common/types';
import React, { PureComponent } from 'react';
import PhotoBrowser from 'react-native-photo-browser';

type Props = {
  media: ActivityMediaConnection,
};

class ActivityMediaScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    headerVisible: false,
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
    console.log(this.getMediaList());
    return (
      <PhotoBrowser
        onBack={this.handleBack}
        displayTopBar
        mediaList={this.getMediaList()}
        displayNavArrows
        enableGrid
        useCircleProgress
      />
    );
  }
}

export default ActivityMediaScreen;
