// @flow
import type { Growth, GraphQLDataProp } from '../../../core/types';
import type { GrowthPeriodOption } from './WhatYouNeedToKnowForPeriod';
import React, { PureComponent } from 'react';
import { LayoutAnimation } from 'react-native';
import { gql, graphql } from 'react-apollo';
import { compose, path } from 'ramda';
import { withCurrentBaby } from '../components';
import { getClosestContentForPeriod } from '../../../core/growth/reducer';
import ExpertAdvice from './ExpertAdvice';
import WhatYouNeedToKnowForPeriod from './WhatYouNeedToKnowForPeriod';
import displayLoadingState from '../components/displayLoadingState';
import { mapEdgesToProp } from '../../../core/helpers/graphqlUtils';

type Props = {
  growth: ?Array<Growth>,
  data: GraphQLDataProp<*>,
  babyName: string,
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
        introductionContentLinks {
          edges {
            node {
              id
              title
              text # for preloading
              section {
                id
                name
              }
            }
          }
        }
        growthDevelopmentContentLinks {
          edges {
            node {
              id
              title
              text # for preloading
              section {
                id
                name
              }
            }
          }
        }
      }
    `,
  };

  state = {
    selectedPeriod: undefined,
  };

  getPeriodOptions(): Array<GrowthPeriodOption> {
    return this.props.growth.map(node => ({
      ...node,
      label: node.title,
      key: node.id,
    }));
  }

  // TODO: use new 'current' implementation in schema instead
  getGrowthForCurrentPeriod(
    options: Array<GrowthPeriodOption>,
  ): GrowthPeriodOption {
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
    const { babyName } = this.props;
    const options = this.getPeriodOptions();
    const current = this.getGrowthForCurrentPeriod(options);

    return (
      <WhatYouNeedToKnowForPeriod
        current={current}
        onPeriodSelect={this.handlePeriodSelect}
        periods={options}
        babyName={babyName}
      />
    );
  }
}

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query WhatYouNeedToKnow($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            dob
            name
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
      props: data => ({
        ...mapEdgesToProp('viewer.baby.growth.edges', 'growth', data),
        babyName: path(['data', 'viewer', 'baby', 'name'], data),
      }),
    },
  ),
  displayLoadingState,
)(WhatYouNeedToKnow);
