// @flow
import type { InviteUserInput } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import uuid from 'react-native-uuid';
import InviteUserForm from './InviteUserForm';
import FriendsList, { query as FriendsListQuery } from './FriendsList';

type Props = {
  onSubmit: (values: InviteUserInput) => Promise<*>,
};

export const InviteUser = ({ onSubmit }: Props) => {
  return (
    <InviteUserForm
      initialValues={{ relationship: 'Other' }}
      onSubmit={onSubmit}
    />
  );
};

export default compose(
  graphql(
    gql`
      mutation InviteUser($input: InviteUserInput!) {
        inviteUser(input: $input) {
          changedEdge {
            ...FriendListEdge
            node {
              ...FriendListUser
            }
          }
        }
      }
      ${FriendsList.fragments.edge}
      ${FriendsList.fragments.item}
    `,
    {
      props: ({ mutate }) => ({
        onSubmit: (values: InviteUserInput) => {
          return mutate({
            variables: {
              input: {
                ...values,
                inviteToken: uuid.v4(),
              },
            },
            update: (store, { data: { inviteUser } }) => {
              if (inviteUser) {
                const data = store.readQuery({ query: FriendsListQuery });
                data.viewer.friends.edges.push(inviteUser.changedEdge);
                store.writeQuery({ query: FriendsListQuery, data });
              }
            },
          });
        },
      }),
    },
  ),
)(InviteUser);
