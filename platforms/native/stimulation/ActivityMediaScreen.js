// @flow
import type { ActivityMediaConnection } from 'core/types';
import React, { PureComponent } from 'react';
import PhotoBrowser from '../../../libs/react-native-photo-browser';

type Props = {
  media: ActivityMediaConnection,
};

class ActivityMediaScreen extends PureComponent {
  props: Props;
  state: {
    media: Array<*>,
  };

  static navigationOptions = {
    mode: 'modal',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      media: this.getMediaList(),
    };
  }

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
        mediaList={this.state.media}
        displayNavArrows
        enableGrid
        useCircleProgress
      />
    );
  }
}

export default ActivityMediaScreen;
