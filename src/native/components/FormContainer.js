// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  children: any,
};

export const FormContainer = ({ children }: Props) => {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ flex: 1, paddingVertical: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default FormContainer;
