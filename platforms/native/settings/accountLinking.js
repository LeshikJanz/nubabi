// @flow
/* eslint-disable no-shadow */
import { gql, graphql } from 'react-apollo';
import { LinkedAccountsList } from './LinkedAccountsList';
import {
  addEdgeToFragment,
  removeEdgeFromFragment,
} from '../../../libs/graphql-utils';
import { loginWithFacebook } from '../auth/actions';
import LinkedAccountItem from './LinkedAccountItem';
import { path } from 'ramda';

const getUserIdFromStore = path(['data', '$ROOT_QUERY.viewer', 'user', 'id']);

export const linkAccount = graphql(
  gql`
    mutation LinkAccount($input: LinkAccountInput!) {
      linkAccount(input: $input) {
        edge {
          node {
            ...LinkedAccountItem
          }
        }
      }
    }
    ${LinkedAccountItem.fragments.item}
  `,
  {
    name: 'linkAccount',
    props: ({ linkAccount }) => ({
      onLinkAccount: () => {
        return loginWithFacebook()
          .then(response => {
            return linkAccount({
              variables: {
                input: {
                  providerId: 'FACEBOOK',
                  accessToken: response.accessToken,
                },
              },
              update: (store, data) => {
                const rootId = getUserIdFromStore(store);

                if (!rootId) {
                  return;
                }

                addEdgeToFragment(
                  LinkedAccountsList.fragments.list,
                  'linkAccount',
                  ['linkedAccounts'],
                  rootId,
                  'head',
                  { fragmentName: 'LinkedAccounts' },
                )(store, data);
              },
            });
          })
          .catch(err => Promise.reject(err));
      },
    }),
  },
);

export const unlinkAccount = graphql(
  gql`
    mutation UnlinkAccount($input: UnlinkAccountInput!) {
      unlinkAccount(input: $input) {
        deletedEdge {
          node {
            id
            provider
          }
        }
      }
    }
  `,
  {
    name: 'unlinkAccount',
    props: ({ unlinkAccount }) => ({
      onUnlinkAccount: (id, providerId) => {
        return unlinkAccount({
          variables: {
            input: {
              providerId,
            },
          },
          update: (store, data) => {
            return removeEdgeFromFragment(
              LinkedAccountsList.fragments.list,
              id,
              getUserIdFromStore(store),
              ['linkedAccounts'],
              { fragmentName: 'LinkedAccounts' },
            )(store, data);
          },
        });
      },
    }),
  },
);
