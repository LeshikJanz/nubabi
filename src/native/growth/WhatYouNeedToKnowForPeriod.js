// @flow
import type { GrowthPeriodOption } from './PeriodFilter';
import React from 'react';
import { ScrollView } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import {
  makeShouldShowIntroductionSelector,
  shouldShowIntroduction,
} from '../../common/growth/reducer';
import { filter } from 'graphql-anywhere';
import { Box, Markdown } from '../components';
import PeriodFilter from './PeriodFilter';
import Introduction from './Introduction';
import HealthcareNotice from './HealthcareNotice';
import ExpertAdvice from './ExpertAdvice';

type Props = {
  current: GrowthPeriodOption,
  periods: Array<GrowthPeriodOption>,
  shouldShowIntroduction: boolean,
  onSkipIntroduction: () => void,
  onPeriodSelect: () => void,
};

export const WhatYouNeedToKnowForPeriod = (props: Props) => {
  const {
    current,
    periods,
    shouldShowIntroduction,
    onSkipIntroduction,
    onPeriodSelect,
  } = props;

  // TODO: bound func in render (onSkip)
  return (
    <ScrollView style={{ flex: 1 }}>
      <PeriodFilter
        options={periods}
        selectedPeriod={current}
        onPeriodSelect={onPeriodSelect}
      />
      <Box zIndex={-1}>
        {shouldShowIntroduction &&
          <Box paddingHorizontal={1}>
            <Introduction
              text={current.introduction}
              onSkip={() => onSkipIntroduction(current.key)}
            />
          </Box>}
        <Box backgroundColor="white" flex={1}>
          <ExpertAdvice
            {...filter(ExpertAdvice.fragments.expert, current.expert)}
          />
          <Box padding={1}>
            <Markdown text={current.content} />
          </Box>
        </Box>
        <Box>
          <HealthcareNotice />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default compose(
  connect((state, props) => ({
    shouldShowIntroduction: shouldShowIntroduction(state, props),
  })),
  // connect((() => {
  //   const shouldShowIntroduction = makeShouldShowIntroductionSelector();
  //   return (state, props) => ({
  //     shouldShouldIntroduction: shouldShowIntroduction(state, props),
  //   });
  // })()),
)(WhatYouNeedToKnowForPeriod);
