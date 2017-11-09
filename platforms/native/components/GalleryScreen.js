// @flow
import type { FileConnection, FileEdge } from '../../../core/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { path } from 'ramda';
import PhotoBrowser from '../../../react-native-photo-browser';
import GalleryVideoItem from './GalleryVideoItem';
import GalleryAudioItem from './GalleryAudioItem';

type Props = {
  navigation: NavigationProp<*> & {
    state: {
      params: {
        files: FileConnection,
        selectedIndex?: number,
      },
    },
  },
};

class GalleryScreen extends PureComponent {
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

  getMediaType(edge: FileEdge) {
    const { contentType } = edge.node;

    if (contentType.startsWith('image')) {
      return 'image';
    } else if (contentType.startsWith('video')) {
      return 'video';
    } else if (contentType.startsWith('audio')) {
      return 'audio';
    }
  }

  getMediaList() {
    // TODO: image interface
    return this.props.navigation.state.params.files.edges.map(edge => ({
      type: this.getMediaType(edge),
      thumb: path(['thumb', 'url'], edge.node),
      photo: edge.node.large ? edge.node.large.url : edge.node.url,
      duration: path(['duration'], edge.node),
    }));
  }

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { selectedIndex, grid } = this.props.navigation.state.params;
    const activeMediaProps = {};

    if (selectedIndex) {
      activeMediaProps.initialIndex = selectedIndex;
    }

    const single = this.state.media.length === 1;

    const startOnGrid = grid || !!(single && selectedIndex);

    return (
      <PhotoBrowser
        mediaList={this.state.media}
        displayNavArrows={!single}
        enableGrid={!single}
        startOnGrid={startOnGrid}
        displaySelectionButtons={false}
        useCircleProgress
        audioComponent={GalleryAudioItem}
        videoComponent={GalleryVideoItem}
        {...activeMediaProps}
      />
    );
  }
}

export default GalleryScreen;
