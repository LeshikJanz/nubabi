// @flow
import type { NavigationOptions } from 'core/types';
import React, { Component } from 'react';
import { assocPath, compose, path, prepend } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { Screen, SubmitFormNavButton } from '../../components';
import BabyForm, { normalizeAvatarAndCoverImage } from './BabyForm';
import theme from 'core/themes/defaultTheme';

type Props = {
  onSubmit: (values: CreateBabyInput) => Promise<ApolloQueryResult<*>>,
};

class AddBaby extends Component {
  props: Props;

  static navigationOptions: NavigationOptions = {
    headerTitle: 'Add Baby',
    headerStyle: {
      backgroundColor: theme.colors.white,
      borderBottomWidth: 0,
    },
    headerRight: <SubmitFormNavButton form="baby" />,
  };

  render() {
    const initialValues = {
      relationship: 'Other',
      weekBorn: 40,
    };

    return (
      <Screen>
        <BabyForm
          mode="add"
          onSubmit={this.props.onSubmit}
          initialValues={initialValues}
        />
      </Screen>
    );
  }
}

export default compose(
  graphql(
    gql`
      mutation CreateBaby($input: CreateBabyInput!) {
        createBaby(input: $input) {
          createdBaby {
            ...BabyForm
          }
        }
      }

      ${BabyForm.fragments.form}
    `,
    {
      props: ({ mutate }) => ({
        onSubmit: values => {
          const input = normalizeAvatarAndCoverImage(values, values);

          return mutate({ variables: { input } });
        },
      }),
      options: {
        refetchQueries: ['Profile', 'getBabyAvatar'],
        // TODO: migrate to update
        updateQueries: {
          ChooseBabyList: (previousData, { mutationResult }) => {
            const edges = ['viewer', 'babies', 'edges'];
            return assocPath(
              edges,
              prepend(
                mutationResult.data.createBaby.createdBaby,
                path(edges, previousData),
              ),
              previousData,
            );
          },
        },
      },
    },
  ),
)(AddBaby);
