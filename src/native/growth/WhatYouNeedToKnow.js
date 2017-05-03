// @flow
import type { State, Growth } from '../../common/types';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, path } from 'ramda';
import { Box, Card, Markdown } from '../components';
import PeriodFilter from './PeriodFilter';
import displayLoadingState from '../components/displayLoadingState';
import Introduction from './Introduction';
type Props = {
  growth: ?Array<Growth>,
};

export class WhatYouNeedToKnow extends PureComponent {
  static fragments = {
    period: gql`
      fragment GrowthPeriod on Growth {
        id
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

  getPeriodOptions() {
    return this.props.growth.map(node => ({
      label: node.title,
      key: node.id,
      content: node.content,
    }));
  }

  getGrowthForCurrentPeriod(options) {
    // FIXME
    return options[0];
  }

  handlePeriodSelect = () => {};

  render() {
    const options = this.getPeriodOptions();
    const current = this.getGrowthForCurrentPeriod(options);

    return (
      <ScrollView style={{ flex: 1 }}>
        <PeriodFilter
          options={this.getPeriodOptions()}
          currentPeriod={current}
          onPeriodSelect={this.handlePeriodSelect}
        />

        <Box padding={1}>
          <Box>
            <Introduction text={current.introduction} />
          </Box>
          <Box backgroundColor="white" flex={1} padding={1}>
            <Markdown text={current.content} />
          </Box>
          <Box>
            <Card margin={1} />
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
          growth {
            edges {
              node {
                ...GrowthPeriod
                ...CurrentGrowth
              }
            }
          }
        }
      }
    }
    ${WhatYouNeedToKnow.fragments.period}
    ${WhatYouNeedToKnow.fragments.current} 
  `,
    {
      options: ownProps => ({
        variables: { babyId: ownProps.currentBabyId },
      }),
      props: ({ data }) => {
        let growth;
        const edges = path(['viewer', 'baby', 'growth', 'edges'], data);

        if (edges.length) {
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
