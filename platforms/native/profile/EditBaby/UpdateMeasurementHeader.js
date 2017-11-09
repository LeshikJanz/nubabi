// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Box, Icon, NubabiIcon, Text } from '../../components';
import theme from '../../../../core/themes/defaultTheme';

type Props = {
  onViewGraph: () => void,
};

export const UpdateMeasurementHeader = ({ onViewGraph }: Props) => {
  const date = moment().format('D MMM YYYY');

  return (
    <Box
      flexDirection="row"
      padding={1}
      justifyContent="space-around"
      style={theme => ({
        backgroundColor: theme.colors.open.white1,
        shadowColor: '#EBEDF5',
        shadowOffset: {
          width: 0,
          height: 1,
        },
      })}
    >
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        style={theme => ({
          borderRightWidth: 0.5,
          borderRightColor: theme.colors.open.gray1,
        })}
      >
        <Icon size={17} name="md-calendar" color={theme.colors.gray} />
        <Text medium size={1} marginLeft={0.5}>
          {date}
        </Text>
      </Box>
      <Box
        as={TouchableOpacity}
        onPress={onViewGraph}
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        paddingLeft={1}
      >
        <NubabiIcon name="growth" color={theme.colors.primary} />
        <Text medium size={1} marginLeft={0.5}>
          View Graph
        </Text>
      </Box>
    </Box>
  );
};

export default UpdateMeasurementHeader;
