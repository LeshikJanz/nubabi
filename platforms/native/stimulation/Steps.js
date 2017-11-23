// @flow
import type { ActivityMediaType, LayoutProps } from 'core/types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import { gql } from 'react-apollo';
import { Box, Card, Text } from '../components';
import Step from './Step';
import withLayout from '../components/withLayout';

type StepType = string;

type Props = {
  steps: Array<StepType>,
  activityName: string,
  activityMedia: ?string,
  activityMediaType: ?ActivityMediaType,
  onActivityMediaPress: () => void,
  layout: LayoutProps,
};

class Steps extends PureComponent {
  props: Props;

  static fragments = {
    steps: gql`
      fragment Steps on Activity {
        name
        steps
        media {
          edges {
            node {
              type
              thumb
              url
            }
          }
        }
      }
    `,
  };

  renderSteps() {
    return this.props.steps.map((step, index) => {
      return <Step key={index} step={step} index={index} />;
    });
  }

  renderMedia() {
    const { activityMedia, activityMediaType, layout } = this.props;
    let media;

    if (!activityMedia) {
      return null;
    }

    const width = layout.viewportWidth * 0.8;

    if (activityMediaType === 'IMAGE') {
      media = (
        <Image style={{ width, height: 200 }} source={{ uri: activityMedia }} />
      );
    }

    return (
      <Box
        as={TouchableOpacity}
        onPress={this.props.onActivityMediaPress}
        padding={1}
      >
        {media}
      </Box>
    );
  }

  render() {
    const title = `Let's begin ${this.props.activityName}`;

    return (
      <Card marginHorizontal={1.2} marginVertical={1} padding={0}>
        {this.renderMedia()}

        <Box contentSpacing>
          <Text color="black" spacing={-0.43} size={6} lineHeight={21}>
            {title}
          </Text>
        </Box>
        <Box flex={1} contentSpacing>
          {this.renderSteps()}
        </Box>
      </Card>
    );
  }
}

export default withLayout(Steps);
