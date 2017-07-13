// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Text, AddButton } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {
  onAddMemory: () => void,
};

export const AddMemoryHeader = ({ onAddMemory }: Props) => {
  return (
    <Box
      contentSpacing
      flexDirection="row"
      padding={2}
      style={() => ({ backgroundColor: '#EDF1FA' })}
    >
      <Box
        as={TouchableOpacity}
        onPress={onAddMemory}
        flex={1}
        flexDirection="row"
        backgroundColor="white"
        padding={0.5}
        style={() => ({ borderColor: '#E9ECF4', borderWidth: 1 })}
        borderRadius={4}
        alignItems="center"
      >
        <AddButton style={{ marginTop: 2, marginRight: 5 }} />
        <Text bold>ADD A MEMORY</Text>
      </Box>
      <Box
        as={TouchableOpacity}
        backgroundColor="white"
        alignItems="center"
        marginLeft={0.5}
        justifyContent="center"
        paddingHorizontal={1}
        borderRadius={4}
        style={() => ({ borderColor: '#E9ECF4', borderWidth: 1 })}
      >
        <Icon name="ios-share-alt" size={24} color={theme.colors.secondary} />
      </Box>
    </Box>
  );
};

export default AddMemoryHeader;
