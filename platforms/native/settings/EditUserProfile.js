// @flow
import type { UpdateUserInput, User } from 'core/types';
import React, { PureComponent } from 'react';
import { compose, omit, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { formValues } from 'core/helpers/graphqlUtils';
import { Box, displayLoadingState } from '../components';
import UserForm from './UserForm';
import { normalizeAvatarAndCoverImage } from '../profile/EditBaby/BabyForm';
import { LinkedAccountsList } from './LinkedAccountsList';
import { accountLinking } from './accountLinking';

type Props = {
  user: User,
  onSubmit: (values: UpdateUserInput) => Promise<*>,
  isAuthLinkingFetching: boolean,
  onLinkAccount: mixed => Promise<*>,
  onUnlinkAccount: string => Promise<*>,
};

export class EditUserProfile extends PureComponent<Props> {
  render() {
    const {
      user,
      onSubmit,
      onLinkAccount,
      onUnlinkAccount,
      isAuthLinkingFetching,
    } = this.props;

    return (
      <Box flex={1} backgroundColor="white">
        <UserForm
          {...filter(LinkedAccountsList.fragments.list, user)}
          isAuthLinkingFetching={isAuthLinkingFetching}
          initialValues={formValues(filter(UserForm.fragments.form, user))}
          onSubmit={onSubmit}
          onLinkAccount={onLinkAccount}
          onUnlinkAccount={onUnlinkAccount}
        />
      </Box>
    );
  }
}

export default compose(
  accountLinking,
  graphql(
    gql`
      mutation UpdateUserProfile($input: UpdateUserInput!) {
        updateUser(input: $input) {
          changedUser {
            ...UserForm
          }
        }
      }
      ${UserForm.fragments.form}
    `,
  ),
  graphql(
    gql`
      query EditUserProfile {
        viewer {
          user {
            ...UserForm
            ...LinkedAccounts
            # For settings view
            avatar {
              thumb {
                url
              }
            }
          }
        }
      }
      ${UserForm.fragments.form}
      ${LinkedAccountsList.fragments.list}
    `,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: ({ data, ownProps: { mutate } }) => ({
        data,
        user: path(['viewer', 'user'], data),
        onSubmit: async values => {
          const input = normalizeAvatarAndCoverImage(
            omit(['avatar'], values),
            values,
          );

          return mutate({
            variables: { input },
          });
        },
      }),
    },
  ),
  displayLoadingState,
)(EditUserProfile);
