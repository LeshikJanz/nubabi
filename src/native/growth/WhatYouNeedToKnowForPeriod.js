// @flow
import type { GrowthPeriodOption } from './PeriodFilter';
import React from 'react';
import { ScrollView } from 'react-native';
import { filter } from 'graphql-anywhere';
import { Box, Markdown, Text } from '../components';
import PeriodFilter from './PeriodFilter';
import HealthcareNotice from './HealthcareNotice';
import ExpertAdvice from './ExpertAdvice';

type Props = {
  current: GrowthPeriodOption,
  periods: Array<GrowthPeriodOption>,
  onPeriodSelect: () => void,
};

export const WhatYouNeedToKnowForPeriod = (props: Props) => {
  const {
    current,
    periods,
    onPeriodSelect,
  } = props;

  const textStyle = {
    paragraph: {
      fontSize: 16,
      lineHeight: 20,
    },
  };

  // TODO: bound func in render (onSkip)
  return (
    <ScrollView style={{ flex: 1 }}>
      <PeriodFilter
        options={periods}
        selectedPeriod={current}
        onPeriodSelect={onPeriodSelect}
      />
      <Box zIndex={-1}>
        <Box backgroundColor="white" paddingBottom={1} flex={1}>
          <ExpertAdvice
            {...filter(ExpertAdvice.fragments.expert, current.expert)}
          />
          <Box paddingHorizontal={1}>
            <Text marginVertical={1} size={3} bold>What you need to know</Text>
            <Markdown text={current.introduction} style={textStyle} />
          </Box>
          <Box paddingHorizontal={1}>
            <Text marginVertical={1} size={3} bold>Growth & Development</Text>
            <Markdown text={current.content} style={textStyle} />
          </Box>
        </Box>
        <Box>
          <HealthcareNotice />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default WhatYouNeedToKnowForPeriod;
