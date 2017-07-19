// @flow
import type { File, FileConnection } from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import PhotoBrowser from 'react-native-photo-browser';
import { path } from 'ramda';

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

  getMediaList() {
    // TODO: image interface
    return this.props.navigation.state.params.files.edges
      .filter(edge => edge.node && edge.node.contentType.startsWith('image'))
      .map(edge => ({
        thumb: path(['thumb', 'url'], edge.node),
        photo: edge.node.url,
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

    const startOnGrid = grid || (single && selectedIndex);

    return (
      <PhotoBrowser
        mediaList={this.state.media}
        displayNavArrows={!single}
        enableGrid={!single}
        startOnGrid={startOnGrid}
        displaySelectionButtons={false}
        useCircleProgress
        {...activeMediaProps}
      />
    );
  }
}

export default GalleryScreen;
