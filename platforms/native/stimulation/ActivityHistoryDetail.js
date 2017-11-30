// @flow
import type { ActivityConnection, GraphQLDataProp } from 'core/types';
import React from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import ActivityList from './ActivityList';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import { isEmptyProp } from 'core/helpers/graphqlUtils';

type Props = {
  periodId: string,
  currentBabyId: string,
  onNavigateToActivity: (id: string, title: string) => void,
  activities: ActivityConnection,
} & GraphQLDataProp<*>;

export const ActivityHistoryDetail = ({
  data,
  activities,
  onNavigateToActivity,
}: Props) => {
  return (
    <ActivityList
      data={data}
      activities={activities}
      onActivityItemPress={onNavigateToActivity}
    />
  );
};

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query ActivityHistoryDetail($periodId: ID!, $babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            activities(filter: { periodId: $periodId }) {
              edges {
                node {
                  ...ActivityList
                }
              }
            }
          }
        }
      }
      ${ActivityList.fragments.activities}
    `,
    {
      options: (ownProps: Props) => ({
        fetchPolicy: 'cache-and-network',
        variables: {
          babyId: ownProps.currentBabyId,
          periodId: ownProps.periodId,
        },
      }),
      props: ({ data }) => ({
        data,
        activities: path(['viewer', 'baby', 'activities', 'edges'], data),
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('activities')),
  displayLoadingState,
)(ActivityHistoryDetail);
