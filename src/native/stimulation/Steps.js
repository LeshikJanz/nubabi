// @flow
import type { ActivityMediaType } from '../../common/types';
import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import Image from 'react-native-cached-image';
import { gql } from 'react-apollo';
import { range } from 'ramda';
import { Card, Text, Box } from '../components';
import Step from './Step';
import theme from '../../common/themes/defaultTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import withLayout from '../components/withLayout';

type StepType = string;

type Props = {
  steps: Array<StepType>,
  activityName: string,
  activityMedia: ?string,
  activityMediaType: ?ActivityMediaType,
  activityMediaThumbnail: ?string,
};

class Steps extends PureComponent {
  props: Props;
  state = {
    currentStep: 0,
  };

  static fragments = {
    steps: gql`
      fragment Steps on Activity {
        name
        steps
        media(first: 1) {
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

  goToStep = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ currentStep: index < 0 ? 0 : index });
  };

  renderStep() {
    const step = this.props.steps[this.state.currentStep];

    return (
      <Step
        step={step}
        activityName={this.props.activityName}
        currentStepIndex={this.state.currentStep}
        length={this.props.steps.length}
      />
    );
  }

  renderIndicators() {
    const numberOfSteps = this.props.steps.length;

    const indicators = range(0, numberOfSteps).map(index => {
      const isActive = this.state.currentStep === index;
      if (isActive) {
        return (
          <View
            key={`indicator-${index}`}
            style={{
              width: 20,
              height: 20,
              borderRadius: 20 / 2,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
            }}
          >
            <Text bold color="white" spacing={-0.3}>
              {index + 1}
            </Text>
          </View>
        );
      }
      return (
        <TouchableOpacity
          key={`indicator-${index}`}
          onPress={() => this.goToStep(index)}
          style={{
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}
        >
          <Icon name="md-disc" size={15} color={theme.colors.open.gray1} />
        </TouchableOpacity>
      );
    });

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        padding={1}
        margin={0}
        style={theme => ({
          borderColor: theme.colors.open.gray0,
          borderTopWidth: StyleSheet.hairlineWidth,
        })}
      >
        {indicators}
      </Box>
    );
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
      <Box padding={1}>
        {media}
      </Box>
    );
  }

  render() {
    return (
      <Card marginHorizontal={1.2} marginVertical={1} padding={0}>
        {this.renderMedia()}
        <Box padding={1} margin={0}>
          {this.renderStep()}
        </Box>
        {this.renderIndicators()}
      </Card>
    );
  }
}

export default withLayout(Steps);
