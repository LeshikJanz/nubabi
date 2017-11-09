// @flow
import type { Gender } from '../../../../core/types';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Box } from '../../components';

type Props = {
  editable?: boolean,
  buttonText: string,
  selected: boolean,
  onChangeGender: (gender: Gender) => void,
};

const GenderButton = ({
  buttonText,
  selected,
  onChangeGender,
  editable,
}: Props) => {
  const containerProps = editable
    ? { as: TouchableOpacity, onPress: onChangeGender }
    : {};

  return (
    <Box {...containerProps}>
      <View
        style={[
          styles.genderButton,
          { marginRight: 20 },
          selected ? styles.selectedButton : '',
        ]}
      >
        <Text style={[styles.genderText, selected ? styles.selectedText : '']}>
          {buttonText}
        </Text>
      </View>
    </Box>
  );
};

GenderButton.defaultProps = {
  editable: true,
};

const styles = StyleSheet.create({
  genderButton: {
    backgroundColor: '#fff',
    borderColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#e9ecf5',
  },
  genderText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#a5b0c0',
  },
  selectedText: {
    color: '#5c646e',
  },
});

export default GenderButton;
