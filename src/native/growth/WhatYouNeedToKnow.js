// @flow
import type { State, Growth } from '../../common/types';
import React, { PureComponent } from 'react';
import { ScrollView, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { compose, path } from 'ramda';
import { Box, Markdown } from '../components';
import PeriodFilter from './PeriodFilter';
import displayLoadingState from '../components/displayLoadingState';
import Introduction from './Introduction';
import HealthcareNotice from './HealthcareNotice';
import ExpertAdvice from './ExpertAdvice';

type Props = {
  growth: ?Array<Growth>,
};

type ComponentState = {
  selectedPeriod: ?string,
};

export class WhatYouNeedToKnow extends PureComponent {
  props: Props;
  state: ComponentState;

  static fragments = {
    period: gql`
      fragment GrowthPeriod on Growth {
        title
      }
    `,
    current: gql`
      fragment CurrentGrowth on Growth {
        introduction
        content
      }
    `,
  };

  state = {
    selectedPeriod: null,
  };

  getPeriodOptions() {
    return this.props.growth.map(node => ({
      label: node.title,
      key: node.id,
      content: node.content,
      expert: node.expert,
      introduction: node.introduction,
    }));
  }

  getGrowthForCurrentPeriod(options) {
    // FIXME
    if (this.state.selectedPeriod) {
      return options.find(period => period.key === this.state.selectedPeriod);
    }

    return options[0];
  }

  handlePeriodSelect = (periodId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    this.setState({
      selectedPeriod: periodId,
    });
  };

  render() {
    const options = this.getPeriodOptions();
    const current = this.getGrowthForCurrentPeriod(options);

    return (
      <ScrollView style={{ flex: 1 }}>
        <PeriodFilter
          options={this.getPeriodOptions()}
          selectedPeriod={current}
          onPeriodSelect={this.handlePeriodSelect}
        />
        <Box zIndex={-1}>
          <Box paddingHorizontal={1}>
            <Introduction text={current.introduction} />
          </Box>
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
  }
}

export default compose(
  connect((state: State) => ({
    currentBabyId: state.babies.currentBabyId,
  })),
  graphql(
    gql`
    query WhatYouNeedToKnow($babyId: ID!) {
      viewer {
        baby(id: $babyId) {
          id
          growth {
            edges {
              node {
                id
                ...GrowthPeriod
                ...CurrentGrowth
                expert {
                  id
                  ...ExpertAdvice
                }
              }
            }
          }
        }
      }
    }
    ${WhatYouNeedToKnow.fragments.period}
    ${WhatYouNeedToKnow.fragments.current} 
    ${ExpertAdvice.fragments.expert}
  `,
    {
      options: ownProps => ({
        variables: { babyId: ownProps.currentBabyId },
      }),
      props: ({ data }) => {
        let growth;
        const edges = path(['viewer', 'baby', 'growth', 'edges'], data);

        if (edges && edges.length) {
          growth = edges.map(edge => edge.node);
        }

        return {
          data,
          growth,
        };
      },
    },
  ),
  displayLoadingState,
)(WhatYouNeedToKnow);
