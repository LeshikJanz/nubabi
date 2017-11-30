// @flow
import type { Baby, State, UnitDisplaySettingsState } from 'core/types';
import { LayoutAnimation, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { skipGrowthGlobalIntro } from 'core/growth/reducer';
import { Box, displayLoadingState, showNoContentViewIf } from '../components';
import Introduction from './Introduction';
import AgeHeader from './AgeHeader';
import WhatYouNeedToKnowButton from './WhatYouNeedToKnowButton';
import GrowthChartButton from './GrowthChartButton';

type Props = {
  baby: Baby,
  skipGrowthGlobalIntro: () => void,
  onNavigateToWhatYouNeedToKnow: () => void,
  onNavigateToGraphDetail: () => void,
  unitDisplay: UnitDisplaySettingsState,
};

export class Growth extends Component<Props> {
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
    const { baby } = this.props;
    const { introduction } = baby.growth;

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
