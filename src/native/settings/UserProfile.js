// @flow
import type { FirebaseUser, LayoutProps } from '../../common/types';
import React, { PureComponent } from 'react';
import Image from 'react-native-cached-image';
import { path } from 'ramda';
import { gql } from 'react-apollo';
import { Box, Text, withLayout } from '../components';
import UsageStat from './UsageStat';

type Props = {
  user: ?FirebaseUser,
  viewer: any, // TODO
  layout: LayoutProps,
};

export class UserProfile extends PureComponent {
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
        totalMemories # TODO: Replace with viewer { allMemories { count } }
        totalAchievements # TODO: same
      }
    `,
    viewer: gql`
      fragment UserProfileViewer on Viewer {
        babies {
          count
        }
      }
    `,
  };

  renderName() {
    const { user } = this.props;
    if (!user.firstName) {
      return null;
    }

    return (
      <Box margin={2} alignItems="center">
        <Text bold size={7}>{user.firstName} {user.lastName}</Text>
      </Box>
    );
  }

  renderAvatar() {
    const avatar = path(['avatar', 'large', 'url'], this.props.user);

    if (!avatar) {
      return null;
    }

    const { viewportWidth } = this.props.layout;
    const size = viewportWidth * 0.8;

    return (
      <Box
        overflow="hidden"
        borderRadius={4}
        style={() => ({
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 1,
          shadowOpacity: 0.25,
        })}
      >
        <Image
          source={{ uri: avatar }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      </Box>
    );
  }

  renderUsage() {
    const babyCount = path(['babies', 'count'], this.props.viewer);
    const achievementsCount = path(['totalAchievements'], this.props.user);
    const memoriesCount = path(['totalMemories'], this.props.user);

    return (
      <Box
        flex={1}
        marginRight={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <UsageStat subject="baby" count={babyCount} />
        <UsageStat subject="memory" count={memoriesCount} />
        <UsageStat subject="achievement" count={achievementsCount} />
      </Box>
    );
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={1}
      >
        {this.renderAvatar()}
        {this.renderName()}
        {this.renderUsage()}
        <Box />
      </Box>
    );
  }
}

export default withLayout(UserProfile);
