// @flow
import type { Gender } from '../../../common/types';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  buttonText: string,
  selected: boolean,
  onChangeGender: (gender: Gender) => void,
};

const GenderButton = ({ buttonText, selected, onChangeGender }: Props) => {
  return (
    <TouchableOpacity onPress={onChangeGender}>
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
    </TouchableOpacity>
  );
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
