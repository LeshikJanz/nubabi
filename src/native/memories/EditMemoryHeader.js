// @flow
import type { State } from '../../common/types';
import React, { PureComponent } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { removeEdgeFromFragment } from '../../common/helpers/graphqlUtils';
import { Icon } from '../components';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';

type Props = {
  goBack: () => void,
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
    this.props.onSubmit().then(() => this.props.goBack());
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
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
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
          // $FlowFixMe$
          return mutate({
            variables: { input: { id: ownProps.memoryId } },
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
          });
        },
      }),
    },
  ),
)(EditMemoryHeader);
