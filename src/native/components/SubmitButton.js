// @flow
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../common/themes/defaultTheme';

type Props = {
  loading: boolean,
  submitText?: string,
  onPress: () => void,
};

export const SubmitButton = ({
  loading,
  submitText = 'SAVE',
  onPress,
}: Props) => {
  const buttonContent =
    loading === true
      ? <ActivityIndicator color={theme.colors.white} />
      : <Text style={styles.submitText}>
          {submitText}
        </Text>;

  const style = loading === true ? { opacity: 0.2 } : {};

  return (
    <View style={[styles.submitButtonContainer, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.submitButton}
        disable={loading}
      >
        {buttonContent}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default SubmitButton;
