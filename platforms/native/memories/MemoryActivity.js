// @flow
import type { MemoryActivityFragment } from 'core/types';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { gql } from 'react-apollo';
import { Box, Text } from '../components';
import iconMappings from '../stimulation/iconMappings';

type Props = MemoryActivityFragment & {
  navigate: () => void,
};

export const MemoryActivity = ({ name, skillArea, navigate }: Props) => {
  const skillIcon = iconMappings(skillArea.icon);
  return (
    <Box flex={1} as={TouchableOpacity} flexDirection="row" onPress={navigate}>
      <Box flex={1}>
        <Text medium numberOfLines={1} color="primary">
          {name}
        </Text>
      </Box>
      <Image
        source={skillIcon}
        resizeMode="contain"
        style={{ width: 16, height: 16, marginHorizontal: 5 }}
      />
    </Box>
  );
};

MemoryActivity.fragments = {
  activity: gql`
    fragment MemoryActivity on Activity {
      id
      name
      skillArea {
        id
        icon
      }
    }
  `,
};

export default connect(null, (dispatch, { id, name: title }) => ({
  navigate: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'viewActivity',
        params: { id, title },
      }),
    ),
}))(MemoryActivity);
