// @flow
import type { State } from '../../../core/types';
import React, { PureComponent } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { removeEdgeFromFragment } from '../../../core/helpers/graphqlUtils';
import { Icon } from '../components';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';
import { appError } from '../../../core/app/actions';
import { toggleNetworkActivityIndicator } from '../../../core/ui/reducer';

type Props = {
  goBack: () => void,
  appError: (error: Error) => void,
  onSubmit: () => Promise<ApolloQueryResult<*>>,
};

class EditMemoryHeader extends PureComponent {
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
        style={{ marginRight: 10 }}
      >
        <Icon name="ios-trash-outline" size={20} />
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
            variables: { input: { id: ownProps.memoryId } },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteMemory: {
                __typename: 'DeleteMemoryPayload',
                memory: {
                  __typename: 'Memory',
                  id: ownProps.memoryId,
                },
              },
            },
            update: (store, data) => {
              const options = [
                ownProps.memoryId,
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
)(EditMemoryHeader);
