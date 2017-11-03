// @flow
import type { NavigationOptions } from '../../../common/types';
import React, { Component } from 'react';
import { assocPath, compose, path, prepend } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { Screen } from '../../components';
import BabyForm from './BabyForm';
import theme from '../../../common/themes/defaultTheme';

type Props = {
  onSubmit: (values: CreateBabyInput) => Promise<ApolloQueryResult<*>>,
};

class AddBaby extends Component {
  props: Props;

  static navigationOptions: NavigationOptions = {
    headerTitle: 'Add Baby',
    headerStyle: {
      backgroundColor: theme.colors.white,
      shadowOpacity: 0,
    },
  };

  render() {
    return (
      <Screen>
        <BabyForm
          mode="add"
          onSubmit={this.props.onSubmit}
          initialValues={{ relationship: 'Other' }}
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
          const input = {
            ...values,
            avatar: values.avatar ? { url: values.avatar.url } : null,
            coverImage: values.coverImage
              ? { url: values.coverImage.url }
              : null,
          };

          return mutate({ variables: { input } });
        },
      }),
      options: {
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
