// @flow
import type { UpdateUserInput, User } from '../../common/types';
import React, { PureComponent } from 'react';
import { compose, path, omit } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { ImageCacheManager } from 'react-native-cached-image';
import { formValues } from '../../common/helpers/graphqlUtils';
import { displayLoadingState } from '../components';
import UserForm from './UserForm';
import { normalizeAvatarAndCoverImage } from '../profile/EditBaby/BabyForm';
import { isNewFile } from '../shared/fileUtils';

type Props = {
  user: User,
  onSubmit: (values: UpdateUserInput) => Promise<*>,
};

export class EditUserProfile extends PureComponent {
  props: Props;
  state = {
    loading: false,
  };

  render() {
    const { user } = this.props;

    return (
      <UserForm
        initialValues={formValues(filter(UserForm.fragments.form, user))}
        onSubmit={this.props.onSubmit}
      />
    );
  }
}

export default compose(
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
