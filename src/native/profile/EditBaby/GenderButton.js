import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const GenderButton = ({ buttonText, selected, onChangeGender }) => {
  return (
    <TouchableOpacity
      onPress={onChangeGender}
    >
      <View
        style={[
          styles.genderButton,
          { marginRight: 20 },
          (selected ? styles.selectedButton : ''),
        ]}

      >
        <Text
          style={[
            styles.genderText,
            (selected ? styles.selectedText : ''),
          ]}
        >
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

GenderButton.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onChangeGender: React.PropTypes.func.isRequired,
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
