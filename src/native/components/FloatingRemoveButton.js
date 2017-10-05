// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from './Box';

type Props = {
  onPress: () => void,
  style?: Object,
};

export const FloatingRemoveButton = ({ onPress, style = {} }: Props) => (
  <Box
    as={TouchableOpacity}
    onPress={onPress}
    style={() => ({
      position: 'absolute',
      top: -8,
      right: -10,
      zIndex: 999,
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
      ...style,
    })}
  >
    <View
      style={{
        flex: 1,
        borderRadius: 20 / 2,
        overflow: 'hidden',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FC',
        borderColor: '#E9ECF4',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      }}
    >
      <Icon
        name="ios-close"
        size={18}
        color="#748294"
        style={{ marginTop: 1 }}
      />
    </View>
  </Box>
);

export default FloatingRemoveButton;
