// @flow
import type { Gender } from '../../../common/types';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import GenderButton from './GenderButton';
import theme from '../../../common/themes/defaultTheme';

type Props = {
  selectedGender: Gender,
  onChangeGender: (gender: Gender) => void,
  hasError: Boolean,
};

const GenderError = () =>
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.errorLabel}>YOU MUST SELECT A GENDER</Text>
  </View>;

const GenderSelection = ({
  selectedGender,
  onChangeGender,
  hasError,
}: Props) => {
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <View style={styles.genderContainer}>
        <GenderButton
          buttonText={'GIRL'}
          selected={selectedGender === 'FEMALE'}
          onChangeGender={() => onChangeGender('FEMALE')}
        />
        <GenderButton
          buttonText={'BOY'}
          selected={selectedGender === 'MALE'}
          onChangeGender={() => onChangeGender('MALE')}
        />
      </View>
      {hasError ? <GenderError /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  errorLabel: {
    fontSize: 8,
    color: theme.colors.danger,
    marginBottom: 4,
  },
});

export default GenderSelection;
