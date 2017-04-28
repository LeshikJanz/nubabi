import React from 'react';
import { View, Text } from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

type Props = {
  babyName: ?string,
};

export const BabyNameTitle = ({ babyName }: Props) => {
  if (!babyName) {
    return <Text />;
  }

  return <Text>{babyName}</Text>;
};

export default compose(
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
  graphql(
    gql`
    query BabyName($id: ID!) {
      viewer {
        baby(id: $id) {
          id
          name
        }
      }
    }
  `,
    {
      options: ({ currentBabyId }) => ({
        variables: { id: currentBabyId },
      }),
      props: ({ data }) => ({
        babyName: path(['viewer', 'baby', 'name'], data),
      }),
    },
  ),
)(BabyNameTitle);
