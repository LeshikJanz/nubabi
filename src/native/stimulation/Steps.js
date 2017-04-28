// @flow
import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import { gql } from 'react-apollo';
import { range } from 'ramda';
import { Card, Text, Box, Image, Button } from '../components';
import theme from '../../common/themes/defaultTheme';
import Icon from 'react-native-vector-icons/Ionicons';

type Step = string;

type Props = {
  steps: Array<Step>,
  activityName: string,
};

const actionCalls = ['begin', 'continue', 'finish'];

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
      }
    `,
  };

  goToStep = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ currentStep: index < 0 ? 0 : index });
  };

  renderTitle(step: Step, index: number) {
    const { activityName } = this.props;
    let actionCall;

    if (index === 0) {
      actionCall = 'begin';
    } else if (index === this.props.steps.length - 1) {
      actionCall = 'finish';
    } else {
      actionCall = 'continue';
    }

    const title = `Let's ${actionCall} ${activityName}`;

    return (
      <Box marginBottom={1}>
        <Text color="black" spacing={-0.43} size={3}>{title}</Text>
      </Box>
    );
  }

  renderStep() {
    const step = this.props.steps[this.state.currentStep];

    if (!step) {
      return null;
    }

    return (
      <Box>
        {this.renderTitle(step, this.state.currentStep)}
        <Text marginBottom={1}>{step}</Text>
        <Image
          src={require('../../common/images/centered-paragraph.png')}
          size={{ width: 290, height: 200 }}
          opacity={0.2}
        />
      </Box>
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

  render() {
    return (
      <Card marginHorizontal={1.2} padding={0}>
        <Box padding={1} margin={0}>
          {this.renderStep()}
        </Box>
        {this.renderIndicators()}
      </Card>
    );
  }
}

export default Steps;
