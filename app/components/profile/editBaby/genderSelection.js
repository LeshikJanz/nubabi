import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import GenderButton from './genderButton';

const GenderSelection = ({ selectedGender, onChangeGender }) => {
  return (
    <View style={styles.genderContainer}>
      <GenderButton
        buttonText={'GIRL'}
        selected={selectedGender === 'f'}
        onChangeGender={() => onChangeGender('f')}
      />
      <GenderButton
        buttonText={'BOY'}
        selected={selectedGender === 'm'}
        onChangeGender={() => onChangeGender('m')}
      />
    </View>
  );
};

GenderSelection.propTypes = {
  selectedGender: React.PropTypes.string.isRequired,
  onChangeGender: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginBottom: 20,
  },
});

export default GenderSelection;
