// @flow
import type { State, Growth, GraphQLDataProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, path } from 'ramda';
import { getClosestContentForPeriod } from '../../common/growth/reducer';
import ExpertAdvice from './ExpertAdvice';
import WhatYouNeedToKnowForPeriod from './WhatYouNeedToKnowForPeriod';
import displayLoadingState from '../components/displayLoadingState';

type Props = {
  growth: ?Array<Growth>,
  data: GraphQLDataProp<*>,
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
        minimumAge
        maximumAge
        ageDuration
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
    selectedPeriod: undefined,
  };

  getPeriodOptions() {
    return this.props.growth.map(node => ({
      ...node,
      label: node.title,
      key: node.id,
    }));
  }

  getGrowthForCurrentPeriod(options) {
    if (this.state.selectedPeriod) {
      return options.find(period => period.key === this.state.selectedPeriod);
    }

    const current = getClosestContentForPeriod(
      options,
      path(['viewer', 'baby', 'dob'], this.props.data),
    );

    // Default to latest content if there's no content
    // for the baby's age.
    return current || options[options.length - 1];
  }

  handlePeriodSelect = (periodId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      selectedPeriod: periodId,
    });
  };

  render() {
    const options = this.getPeriodOptions();
    const current = this.getGrowthForCurrentPeriod(options);

    return (
      <WhatYouNeedToKnowForPeriod
        current={current}
        onPeriodSelect={this.handlePeriodSelect}
        periods={options}
      />
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
            dob
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
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
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
