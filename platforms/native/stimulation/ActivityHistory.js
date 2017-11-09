// @flow
import type { State } from '../../../core/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import {
  isEmptyProp,
  mapEdgesToProp,
} from '../../../core/helpers/graphqlUtils';
import ActivityHistoryList from './ActivityHistoryList';
import ActivityHistoryItem from './ActivityHistoryItem';

type Props = {}; // TODO;

export const ActivityHistory = (props: Props) => {
  return <ActivityHistoryList {...props} />;
};

export default compose(
  withCurrentBaby,
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
