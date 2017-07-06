// @flow
import type { UserEdge } from '../../common/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { Avatar, displayLoadingState, ListItem, Text } from '../components';
import PendingAvatar from './PendingAvatar';
import theme from '../../common/themes/defaultTheme';

type Props = {
  friends: Array<UserEdge>,
};

const keyExtractor = path(['node', 'id']);

export class FriendsList extends PureComponent {
  props: Props;

  renderItem = ({ item, index }: { item: UserEdge }) => {
    const { node: user, isPending, relationship } = item;

    const name = [user.firstName, user.lastName].join(' ');
    const nameText = isPending ? `${name} (Pending)` : name;
    const nameStyle = theme => {
      return isPending ? { color: theme.colors.secondary } : {};
    };

    const initials = [user.firstName[0], user.lastName[0]].join('');
    const avatar = isPending
      ? <PendingAvatar />
      : <Avatar
          src={path(['avatar', 'url'], user)}
          fallbackText={initials}
          backgroundColor={theme.colors.gray}
          color={theme.colors.white}
        />;

    const isLast = index === this.props.friends.length - 1;

    return (
      <ListItem avatarLeft={avatar} last={isLast}>
        <Text style={nameStyle}>
          {nameText}
        </Text>

        <Text marginTop={0.5} style={nameStyle}>
          {relationship}
        </Text>
      </ListItem>
    );
  };

  render() {
    return (
      <FlatList
        renderItem={this.renderItem}
        data={this.props.friends}
        keyExtractor={keyExtractor}
      />
    );
  }
}

export default compose(
  graphql(
    gql`
      query FriendsList {
        viewer {
          friends {
            edges {
              relationship
              isPending
              node {
                id
                firstName
                lastName
                avatar {
                  thumb {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: ({ data }) => ({
        data,
        friends: path(['viewer', 'friends', 'edges'], data),
      }),
    },
  ),
  displayLoadingState,
)(FriendsList);
