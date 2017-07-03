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
    return <Text>Nubabi</Text>;
  }

  return (
    <Text>
      {babyName}
    </Text>
  );
};

export default compose(
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
  graphql(
    gql`
      query BabyName($id: ID) {
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
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: { id: currentBabyId },
        skip: !currentBabyId,
      }),
      props: ({ data }) => ({
        babyName: path(['viewer', 'baby', 'name'], data),
      }),
    },
  ),
)(BabyNameTitle);
