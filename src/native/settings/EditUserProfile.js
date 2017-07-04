// @flow
import type { User, UpdateUserInput } from '../../common/types';
import React from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { formValues } from '../shared/graphqlUtils';
import { displayLoadingState } from '../components';
import UserForm from './UserForm';

type Props = {
  user: User,
  onSubmit: (values: UpdateUserInput) => Promise<*>,
};

export const EditUserProfile = ({ user, onSubmit }: Props) => {
  return (
    <UserForm
      initialValues={formValues(filter(UserForm.fragments.form, user))}
      onSubmit={onSubmit}
    />
  );
};

export default compose(
  graphql(gql`
    mutation UpdateUserProfile($input: UpdateUserInput!) {
      updateUser(input: $input) {
        changedUser {
          ...UserForm
        }
      }
    }
    ${UserForm.fragments.form}
  `),
  graphql(
    gql`
    query EditUserProfile {
      viewer {
        user {
          ...UserForm
        }
      }
    }
    ${UserForm.fragments.form}
  `,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: ({ data, ownProps: { mutate } }) => ({
        data,
        user: path(['viewer', 'user'], data),
        onSubmit: values => {
          mutate({ variables: { input: values } });
        },
      }),
    },
  ),
  displayLoadingState,
)(EditUserProfile);
