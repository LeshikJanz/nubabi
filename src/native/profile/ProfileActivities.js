// @flow
import type { Activity, ActivityConnection } from '../../common/types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { gql } from 'react-apollo';
import { Box, Card, Image, Text } from '../components';
import formatPossessive from '../../common/helpers/formatPossessive';
import { flattenEdges } from '../../common/helpers/graphqlUtils';
import iconMappings from '../stimulation/iconMappings';

type Props = {
  babyName: string,
  activities: ActivityConnection,
  onViewActivity: (id: string) => void,
  onViewAll: () => void,
};

export class ProfileActivities extends PureComponent {
  props: Props;

  static fragments = {
    list: gql`
      fragment ProfileActivities on Baby {
        activities(first: 2) {
          edges {
            node {
              id
              name
              introduction
              skillArea {
                id
                icon
              }
            }
          }
        }
      }
    `,
  };

  renderActivity(activity: Activity, index: number) {
    const rowStyle = () => {
      return index === 0
        ? { borderBottomWidth: 1, borderColor: '#EDF0F9', paddingBottom: 15 }
        : { marginTop: 15 };
    };
    const skillIcon = iconMappings(activity.skillArea.icon);

    const onPress = () => this.props.onViewActivity(activity.id, activity.name);

    return (
      <Box key={activity.id} flexDirection="row" style={rowStyle}>
        <Box
          borderWidth={1}
          marginRight={1}
          style={() => ({
            width: 62,
            height: 62,
            borderRadius: 62 / 2,
            borderColor: '#CFD6DF',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Box
            style={() => ({
              alignSelf: 'center',
              backgroundColor: '#EDF1FA',
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
            })}
          />
          <Image
            src={skillIcon}
            size={{ width: 42, height: 34 }}
            resizeMode="contain"
          />
        </Box>
        <Box flex={1}>
          <TouchableOpacity onPress={onPress}>
            <Text color="primary" medium marginBottom={0.5}>
              {activity.name}
            </Text>
          </TouchableOpacity>
          <Text numberOfLines={3} color="secondary">
            {activity.introduction}
          </Text>
        </Box>
      </Box>
    );
  }

  renderActivities() {
    const activities = flattenEdges(this.props.activities);
    return activities.map((activity, index) =>
      this.renderActivity(activity, index),
    );
  }

  render() {
    const { babyName, onViewAll } = this.props;

    return (
      <Box contentSpacing>
        <Card padding={0}>
          <Box contentSpacing paddingBottom={0}>
            <Text size={4}>
              {formatPossessive(babyName)} Week Ahead
            </Text>
          </Box>
          <Box contentSpacing>
            {this.renderActivities()}
          </Box>
          <Box contentSpacing alignItems="flex-end">
            <TouchableOpacity onPress={onViewAll}>
              <Text color="primary" medium>
                See all activities
              </Text>
            </TouchableOpacity>
          </Box>
        </Card>
      </Box>
    );
  }
}

export default ProfileActivities;
