// @flow
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { gql } from 'react-apollo';
import { Box, Text, Card, Image, Button } from '../components/index';
import Icon from './ActionIcon';
import ActionCard from './ActionCard';

type Props = {
  babyName: string,
  activityName: string,
  skillIcon: number, // RN require
  collapsed?: boolean,
  onSwoop: () => void,
  onIncrease: () => void,
  onDecrease: () => void,
  onComplete: () => void,
};

class ActivityActions extends Component {
  props: Props;

  static fragments = {
    activity: gql`
      fragment ActivityActionsActivity on Activity {
        name
        isCompleted
      }
    `,
    skill: gql`
      fragment ActivityActionsSkill on SkillArea {
        icon
      }
    `,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed:
        typeof props.collapsed !== 'undefined' ? props.collapsed : false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.collapsed !== this.props.collapsed) {
      this.setState({ collapsed: nextProps.collapsed });
    }
  }
  handleComplete = () => {
    this.toggleCollapsed();
    const isCompleted = this.props.collapsed;
    if (!isCompleted) {
      this.props.onComplete();
    }
  };

  toggleCollapsed = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(state => ({
      collapsed: !state.collapsed,
    }));
  };

  renderTrigger() {
    const { babyName } = this.props;

    return (
      <Card
        padding={0.5}
        margin={1}
        flex={1}
        flexDirection="row"
        alignSelf="stretch"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start"
          flex={1}
        >
          <Icon
            size={30}
            color="primary"
            name="md-checkmark"
            style={{ textAlign: 'center' }}
          />
          <Box
            flex={1}
            marginHorizontal={1}
            justifyContent="space-between"
            alignSelf="flex-start"
          >
            <Text bold>ACTIVITY COMPLETED</Text>
            <Text color="secondary" marginTop={1}>
              Great job {babyName}
            </Text>
          </Box>
        </Box>
        <Box alignItems="flex-end">
          <Button
            primary
            borderWidth={0}
            onPress={this.toggleCollapsed}
            alignSelf="flex-end"
            style={() => ({
              paddingVertical: 5,
            })}
          >
            CHANGE
          </Button>
        </Box>
      </Card>
    );
  }

  renderLevelCards() {
    const { collapsed: isCompleted, babyName } = this.props;

    const completeText = isCompleted ? 'ACTIVITY COMPLETED' : 'MARK AS DONE';

    const completeHint = isCompleted
      ? `Great job ${babyName}`
      : "Tick if you've completed it";

    return (
      <Box
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        marginHorizontal={0.5}
      >
        <ActionCard
          icon="md-arrow-down"
          text="NOT READY"
          hint="Not quite ready for this"
          onPress={this.props.onDecrease}
        />
        <ActionCard
          icon="md-checkmark"
          text={completeText}
          hint={completeHint}
          marginHorizontal={0.5}
          onPress={this.handleComplete}
        />
        <ActionCard
          icon="md-arrow-up"
          text="TOO EASY"
          hint="Increase the level"
          onPress={this.props.onIncrease}
        />
      </Box>
    );
  }

  render() {
    const { babyName, activityName, skillIcon, onSwoop } = this.props;

    const { collapsed } = this.state;

    return (
      <Box flex={1}>
        <Box marginVertical={2} alignItems="center" justifyContent="center">
          <Button
            white
            paddingVertical={0.5}
            textStyle={theme => ({ color: theme.colors.open.gray3 })}
            onPress={onSwoop}
          >
            SWAP OUT THIS ACTIVITY
          </Button>
        </Box>
        <Box
          marginTop={1}
          alignItems="center"
          justifyContent="center"
          flex={1}
          paddingVertical={1}
          style={() => ({ backgroundColor: '#EDF1FA' })}
        >
          <Box
            style={() => ({
              marginTop: -45,
              backgroundColor: '#EDF1FA',
              width: 75,
              height: 75,
              borderRadius: 75 / 2,
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Box
              style={() => ({
                backgroundColor: 'white',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 75 / 2,
              })}
              shadowRadius={2}
              shadowOpacity={0.5}
              shadowOffset={{
                height: 0,
                width: 0,
              }}
            >
              <Box
                style={() => ({
                  backgroundColor: '#EDF1FA',
                  position: 'relative',
                  bottom: 0,
                  left: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  marginBottom: -30,
                })}
              />
              <Image src={skillIcon} size={{ width: 45, height: 38 }} />
            </Box>
          </Box>

          <Text bold color="primary" style={() => ({ letterSpacing: -0.19 })}>
            {activityName}
          </Text>

          <Text
            color="black"
            textAlign="center"
            size={6}
            marginTop={0.5}
            style={() => ({
              letterSpacing: -0.43,
              lineHeight: 24,
            })}
          >
            Adjust the level of activity for {babyName}:
          </Text>

          {collapsed ? this.renderTrigger() : this.renderLevelCards()}
        </Box>
      </Box>
    );
  }
}

export default ActivityActions;
