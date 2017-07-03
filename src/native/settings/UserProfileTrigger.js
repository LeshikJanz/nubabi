// @flow
import type { FirebaseUser, LayoutProps } from '../../common/types';
import React, { PureComponent } from 'react';
import { path } from 'ramda';
import { gql } from 'react-apollo';
import { Avatar, Text, ListItem } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {
  user: FirebaseUser,
  layout: LayoutProps,
};

export class UserProfileTrigger extends PureComponent {
  props: Props;

  static fragments = {
    profile: gql`
      fragment UserProfile on User {
        id
        firstName
        lastName
        avatar {
          large {
            url
          }
        }
      }
    `,
  };

  getInitials() {
    const { user } = this.props;
    const firstNameInitial = path(['firstName', '0'], user);
    const lastNameInitial = path(['lastName', '0'], user);

    return `${firstNameInitial}${lastNameInitial}`;
  }

  renderAvatar() {
    const { user } = this.props;
    return (
      <Avatar
        src={path(['avatar', 'large', 'url'], user)}
        fallbackText={this.getInitials()}
        backgroundColor={theme.colors.gray}
        color={theme.colors.white}
      />
    );
  }

  render() {
    const { user } = this.props;
    return (
      <ListItem avatarLeft={this.renderAvatar()} rightArrow last>
        <Text size={2} color="secondary" marginBottom={0.2}>
          {user.firstName} {user.lastName}
        </Text>
        <Text color="secondary" style={() => ({ letterSpacing: -0.21 })}>
          My profile details
        </Text>
      </ListItem>
    );
  }
}

export default UserProfileTrigger;
