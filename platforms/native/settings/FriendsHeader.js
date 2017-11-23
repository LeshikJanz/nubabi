// @flow
import React from 'react';
import { Box, Text, FAB } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from 'core/themes/defaultTheme';

type Props = {
  onAddPress: () => void,
};

export const FriendsHeader = ({ onAddPress }: Props) => {
  return (
    <Box
      padding={2}
      paddingBottom={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text bold size={6}>
        Invite Family & Friends
      </Text>
      <Text marginVertical={1} align="center">
        Allow important people to view your baby's weekly activities and
        memories
      </Text>

      <FAB size={50} onPress={onAddPress}>
        <Icon name="ios-add" size={30} color={theme.colors.secondary} />
      </FAB>
    </Box>
  );
};

export default FriendsHeader;
