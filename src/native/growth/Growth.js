// @flow
import type { State, Baby } from '../../common/types';
import type { Event } from 'react-native';
import React, { Component, PureComponent } from 'react';
import { ScrollView, LayoutAnimation } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { connect } from 'react-redux';
import moment from 'moment';
import { skipGrowthGlobalIntro } from '../../common/growth/reducer';
import {
  Box,
  Card,
  Text,
  displayLoadingState,
  showNoContentViewIf,
} from '../components';
import Introduction from './Introduction';
import AgeHeader from './AgeHeader';
import ThisWeekGrowthButton from './ThisWeekGrowthButton';
import Chart from './Chart';

type Props = {
  baby: Baby,
  skipGrowthGlobalIntro: () => void,
  onNavigateToWhatYouNeedToKnow: () => void,
};

const formatName = (name: string) => {
  return name.endsWith('s') ? `${name}'` : `${name}'s`;
};

const DAY_MS = 86400000;

const defaultData = [
  { timestamp: new Date(2007, 1, 1).getTime(), value: 83.24 },
  { timestamp: new Date(2007, 1, 2).getTime(), value: 85.35 },
  { timestamp: new Date(2007, 1, 3).getTime(), value: 98.84 },
  { timestamp: new Date(2007, 1, 4).getTime(), value: 79.92 },
  { timestamp: new Date(2007, 1, 5).getTime(), value: 83.80 },
  { timestamp: new Date(2007, 1, 6).getTime(), value: 88.47 },
  { timestamp: new Date(2007, 1, 7).getTime(), value: 94.47 },
];

export class Growth extends Component {
  props: Props;
  state = {
    width: null,
    height: null,
  };

  static fragments = {
    introduction: gql`
      fragment GrowthIntroduction on GrowthConnection {
        introduction @skip(if: $hasSeenGlobalIntro)
      }
    `,
  };

  handleIntroductionSkip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.props.skipGrowthGlobalIntro();
  };

  getChartData() {
    if (
      !path(['measurements', 'heights', 'edges', '0', 'node'], this.props.baby)
    ) {
      return defaultData; // TODO: how to handle this?
    }

    const measurements = path(
      ['measurements', 'heights', 'edges'],
      this.props.baby,
    ).map(edge => {
      return {
        timestamp: new Date(edge.node.recordedAt).getTime(),
        value: edge.node.value,
      };
    });

    return [
      // HACK: so it kinda curves so the graph doesn't cut
      /*
      {
        timestamp: moment(this.props.baby.dob).toDate().getTime() - DAY_MS,
        value: measurements[0].value - 5,
        point: false,
      },
      */
      ...measurements,
    ];
  }

  render() {
    const { baby } = this.props;
    const introduction = baby.growth.introduction;

    return (
      <ScrollView
        style={{ flex: 1 }}
        hitSlop={{ top: 0, left: 0, bottom: 0, right: 0 }}
      >
        <AgeHeader {...filter(AgeHeader.fragments.baby, baby)} />
        <Box contentSpacing>
          <Introduction
            text={introduction}
            onSkip={this.handleIntroductionSkip}
          />
          <ThisWeekGrowthButton
            onPress={this.props.onNavigateToWhatYouNeedToKnow}
          />
          <Card padding={0}>
            <Box marginTop={0.5}>
              <Box
                flexDirection="row"
                marginBottom={1}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Text
                  color="secondary"
                  size={7}
                  marginHorizontal={1}
                  spacing={-0.68}
                  textAlign="center"
                >
                  {baby.weight}
                  <Text color="secondary" size={2} marginHorizontal={1}>
                    kg
                  </Text>
                </Text>
                <Text
                  color="secondary"
                  size={7}
                  spacing={-0.68}
                  textAlign="center"
                >
                  {baby.height}
                  <Text color="secondary" size={2}>cm</Text>
                </Text>
              </Box>
              <Chart data={this.getChartData()} height={120} />
            </Box>
            <Box justifyContent="center" padding={1}>
              <Text size={2}>
                {formatName(baby.name)} Growth Chart
              </Text>
            </Box>
          </Card>
        </Box>
      </ScrollView>
    );
  }
}

export default compose(
  connect(
    (state: State) => ({
      currentBabyId: state.babies.currentBabyId,
      hasSeenGlobalIntro: state.growth.hasSeenGlobalIntro,
    }),
    {
      skipGrowthGlobalIntro,
    },
  ),
  graphql(
    gql`
      query Growth($babyId: ID!, $hasSeenGlobalIntro: Boolean!) {
        viewer {
          baby(id: $babyId) {
            id
            weight
            height
            measurements {
              heights {
                edges {
                  node {
                    value
                    recordedAt
                  }
                }
              }
            }
            growth {
              ...GrowthIntroduction
              edges {
                node {
                  id
                  title
                  introduction
                  content
                  minimumAge
                  maximumAge
                  ageDuration
                },
              }
            }
            ...AgeHeader
          }
        }
      }
      ${Growth.fragments.introduction}
      ${AgeHeader.fragments.baby}
    `,
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: {
          babyId: ownProps.currentBabyId,
          hasSeenGlobalIntro: ownProps.hasSeenGlobalIntro,
        },
        skip: !ownProps.currentBabyId,
      }),
      props: ({ data }) => ({
        data,
        baby: path(['viewer', 'baby'], data),
      }),
    },
  ),
  showNoContentViewIf(props => !props.baby),
  displayLoadingState,
)(Growth);
