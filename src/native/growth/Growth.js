// @flow
import type { State, Baby } from '../../common/types';
import React, { PureComponent } from 'react';
import { ScrollView, LayoutAnimation } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { skipGrowthGlobalIntro } from '../../common/growth/reducer';
import { Box, Card } from '../components';
import displayLoadingState from '../components/displayLoadingState';
import Introduction from './Introduction';
import AgeHeader from './AgeHeader';
import WhatYouNeedToKnowButton from './WhatYouNeedToKnowButton';
import DevelopmentRoadmapButton from './DevelopmentRoadmapButton';

type Props = {
  baby: Baby,
  skipGrowthGlobalIntro: () => void,
  onNavigateToWhatYouNeedToKnow: () => void,
  onNavigateToDevelopmentRoadmap: () => void,
};

export class Growth extends PureComponent {
  props: Props;

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
    const introduction = baby.growth.introduction;

    return (
      <ScrollView style={{ flex: 1 }}>
        <AgeHeader {...filter(AgeHeader.fragments.baby, baby)} />
        <Box padding={1}>
          <Introduction
            text={introduction}
            onSkip={this.handleIntroductionSkip}
          />
          <WhatYouNeedToKnowButton
            onPress={this.props.onNavigateToWhatYouNeedToKnow}
          />
          <Card />
          <DevelopmentRoadmapButton
            onPress={this.props.onNavigateToDevelopmentRoadmap}
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
        variables: {
          babyId: ownProps.currentBabyId,
          hasSeenGlobalIntro: ownProps.hasSeenGlobalIntro,
        },
      }),
      props: ({ data }) => ({
        data,
        baby: path(['viewer', 'baby'], data),
      }),
    },
  ),
  displayLoadingState,
)(Growth);
