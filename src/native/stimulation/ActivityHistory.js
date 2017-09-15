// @flow
import type { State } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { displayLoadingState, showNoContentViewIf } from '../components';
import { isEmptyProp, mapEdgesToProp } from '../../common/helpers/graphqlUtils';
import ActivityHistoryList from './ActivityHistoryList';
import ActivityHistoryItem from './ActivityHistoryItem';

type Props = {}; // TODO;

export const ActivityHistory = (props: Props) => {
  return <ActivityHistoryList {...props} />;
};

export default compose(
  connect((state: State) => ({
    currentBabyId: state.babies.currentBabyId,
  })),
  graphql(
    gql`
      query ActivityHistory($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            activityHistory {
              edges {
                node {
                  ...ActivityHistoryItem
                }
              }
            }
          }
        }
      }
      ${ActivityHistoryItem.fragments.item}
    `,
    {
      options: ownProps => ({
        variables: {
          babyId: ownProps.currentBabyId,
        },
        fetchPolicy: 'cache-and-network',
      }),
      props: mapEdgesToProp('viewer.baby.activityHistory', 'history'),
    },
  ),
  showNoContentViewIf(isEmptyProp('history')),
  displayLoadingState,
)(ActivityHistory);
