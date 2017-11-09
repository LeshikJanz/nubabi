// @flow
import type { UserEdge } from '../../../core/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { hoistStatics } from 'recompose';
import { Avatar, displayLoadingState, ListItem, Text } from '../components';
import PendingAvatar from './PendingAvatar';
import theme from '../../../core/themes/defaultTheme';
import withPullToRefresh, {
  type PullToRefreshProps,
} from '../components/withPullToRefresh';

type Props = {
  friends: Array<UserEdge>,
} & PullToRefreshProps;

const keyExtractor = path(['node', 'id']);

export class FriendsList extends PureComponent {
  props: Props;

  static fragments = {
    item: gql`
      fragment FriendListUser on User {
        id
        firstName
        lastName
        avatar {
          thumb {
            url
          }
        }
      }
    `,
    edge: gql`
      fragment FriendListEdge on UserEdge {
        relationship
        isPending
      }
    `,
  };

  renderItem = ({ item, index }: { item: UserEdge }) => {
    const { node: user, isPending, relationship } = item;

    const name = [user.firstName, user.lastName].join(' ');
    const nameText = isPending ? `${name} (Pending)` : name;
    const nameStyle = theme => {
      return isPending ? { color: theme.colors.secondary } : {};
    };

    const initials = [user.firstName[0], user.lastName[0]].join('');
    const avatar = isPending ? (
      <PendingAvatar />
    ) : (
      <Avatar
        src={path(['avatar', 'url'], user)}
        fallbackText={initials}
        backgroundColor={theme.colors.gray}
        color={theme.colors.white}
      />
    );

    const isLast = index === this.props.friends.length - 1;

    return (
      <ListItem avatarLeft={avatar} last={isLast}>
        <Text style={nameStyle}>{nameText}</Text>

        <Text marginTop={0.5} style={nameStyle}>
          {relationship}
        </Text>
      </ListItem>
    );
  };

  render() {
    const { friends, refreshing, handleRefresh } = this.props;
    return (
      <FlatList
        renderItem={this.renderItem}
        data={friends}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export const query = gql`
  query FriendsList {
    viewer {
      friends {
        edges {
          ...FriendListEdge

          node {
            ...FriendListUser
          }
        }
      }
    }
  }

  ${FriendsList.fragments.item}
  ${FriendsList.fragments.edge}
`;

export default compose(
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: ({ data }) => ({
      data,
      friends: path(['viewer', 'friends', 'edges'], data),
    }),
  }),
  withPullToRefresh,
  displayLoadingState,
)(FriendsList);
