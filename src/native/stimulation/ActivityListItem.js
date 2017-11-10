// @flow
import type { Activity, SkillArea } from '../../common/types';
import React from 'react';
import { Dimensions, Text, TouchableHighlight, View } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import { path } from 'ramda';
import { Box, Icon } from '../components';
import iconMappings from './iconMappings';
import theme from '../../common/themes/defaultTheme';

const width = Dimensions.get('window').width;

type Props = {
  skillArea: SkillArea,
  activity: Activity,
  onPress: () => void,
};

export const ActivityListItem = (props: Props) => {
  const { skillArea, activity, onPress } = props;

  return (
    <TouchableHighlight
      key={skillArea.id}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <View style={styles.activityRow}>
        <Box
          overflow="hidden"
          borderTopLeftRadius={4}
          borderBottomLeftRadius={4}
        >
          <Image
            style={styles.skillImage}
            source={{ uri: path(['image', 'thumb', 'url'], skillArea) }}
          />
        </Box>
        <Box flex={1}>
          <View style={styles.textContainer}>
            <Text style={styles.skillName}>{skillArea.name}</Text>
            <Text style={styles.activityName}>{activity.name}</Text>
          </View>
        </Box>
        <Box>
          <Box flex={1}>
            <Image
              style={styles.skillIcon}
              source={iconMappings(skillArea.icon)}
              resizeMode="contain"
            />
          </Box>
          {activity.isCompleted && (
            <Icon
              name="md-checkmark-circle-outline"
              color={theme.colors.primary}
              size={24}
              style={{ marginBottom: 5, marginRight: 12 }}
            />
          )}
        </Box>
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  activityRow: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    width: width - 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  skillImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    padding: 10,
  },
  skillName: {
    color: '#454D56',
    fontSize: 16,
    marginBottom: 5,
  },
  activityName: {
    color: '#748294',
    fontSize: 14,
  },
  skillIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    right: 10,
    top: 10,
  },
};

export default ActivityListItem;
