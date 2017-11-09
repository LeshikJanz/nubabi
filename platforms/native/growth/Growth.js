// @flow
import type {
  Baby,
  State,
  UnitDisplaySettingsState,
} from '../../../core/types';
import type { Event } from 'react-native';
import { LayoutAnimation, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { skipGrowthGlobalIntro } from '../../../core/growth/reducer';
import {
  Box,
  Card,
  displayLoadingState,
  showNoContentViewIf,
  Text,
} from '../components';
import Introduction from './Introduction';
import AgeHeader from './AgeHeader';
import WhatYouNeedToKnowButton from './WhatYouNeedToKnowButton';
import GrowthChartButton from './GrowthChartButton';
import { formatMeasurement } from '../../../core/helpers/measurement';

type Props = {
  baby: Baby,
  skipGrowthGlobalIntro: () => void,
  onNavigateToWhatYouNeedToKnow: () => void,
  onNavigateToGraphDetail: () => void,
  unitDisplay: UnitDisplaySettingsState,
};

const DAY_MS = 86400000;

const defaultData = [
  { recordedAt: new Date(2007, 1, 1), value: 83.24 },
  { recordedAt: new Date(2007, 1, 2), value: 85.35 },
  { recordedAt: new Date(2007, 1, 3), value: 98.84 },
  { recordedAt: new Date(2007, 1, 4), value: 79.92 },
  { recordedAt: new Date(2007, 1, 5), value: 83.8 },
  { recordedAt: new Date(2007, 1, 6), value: 88.47 },
  { recordedAt: new Date(2007, 1, 7), value: 94.47 },
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

  render() {
    const { baby, unitDisplay } = this.props;
    const introduction = baby.growth.introduction;

    const lastMeasurement = (type: 'weights' | 'heights', data) =>
      path(['measurements', type, 'edges', '0', 'node'], data);

    const height = lastMeasurement('heights', baby);
    const weight = lastMeasurement('weights', baby);

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
          <WhatYouNeedToKnowButton
            onPress={this.props.onNavigateToWhatYouNeedToKnow}
          />
          <GrowthChartButton
            babyName={baby.name}
            weight={weight}
            height={height}
            unitDisplay={this.props.unitDisplay}
            onPress={this.props.onNavigateToGraphDetail}
          />
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
      unitDisplay: state.settings.unitDisplay,
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
            measurements {
              weights(last: 1) {
                edges {
                  node {
                    value
                    recordedAt
                  }
                }
              }
              heights(last: 1) {
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
