// @flow
import type { State } from 'core/types';
import React, { PureComponent } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { removeEdgeFromFragment } from 'core/helpers/graphqlUtils';
import { Text } from '../components';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';
import { appError } from 'core/app/actions';
import { toggleNetworkActivityIndicator } from 'core/ui/reducer';

type Props = {
  goBack: () => void,
  appError: (error: Error) => void,
  onSubmit: () => Promise<ApolloQueryResult<*>>,
};

export class RemoveMemoryButton extends PureComponent<Props> {
  props: Props;

  promptForDeletion = () => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: this.handleDelete,
        },
      ],
    );
  };

  handleDelete = () => {
    this.props.onSubmit().catch(() =>
      setTimeout(() => {
        this.props.appError(
          new Error(
            'There was a problem deleting a memory. Please try again later.',
          ),
        );
      }, 1000),
    );
    this.props.goBack();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.promptForDeletion}
        style={{
          flex: 1,
          marginRight: 10,
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text color="primary" bold>
          delete this memory
        </Text>
      </TouchableOpacity>
    );
  }
}

export default compose(
  connect(
    ({ babies }: State) => ({
      currentBabyId: babies.currentBabyId,
    }),
    { appError, toggleNetworkActivityIndicator },
  ),
  graphql(
    gql`
      mutation DeleteMemory($input: DeleteMemoryInput!) {
        deleteMemory(input: $input) {
          memory {
            id
          }
        }
      }
    `,
    {
      props: ({ mutate, ownProps }) => ({
        onSubmit: () => {
          ownProps.toggleNetworkActivityIndicator(true);

          // $FlowFixMe$
          return mutate({
            variables: { input: { id: ownProps.id } },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteMemory: {
                __typename: 'DeleteMemoryPayload',
                memory: {
                  __typename: 'Memory',
                  id: ownProps.id,
                },
              },
            },
            update: (store, data) => {
              const options = [
                ownProps.id,
                ownProps.currentBabyId,
                ['memories'],
              ];

              removeEdgeFromFragment(
                RecentMemories.fragments.memories,
                ...options,
              )(store, data);

              removeEdgeFromFragment(ViewMemories.fragments.list, ...options, {
                fragmentName: 'Memories',
              })(store, data);
            },
          }).finally(() => ownProps.toggleNetworkActivityIndicator(false));
        },
      }),
    },
  ),
)(RemoveMemoryButton);
