// @flow
import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemeProvider } from 'react-fela';
import FelaProvider from 'core/components/FelaProvider';

type Props = {
  children?: any,
};

export const NativeFelaProvider = (renderer: Object, theme: Object) => {
  const component = ({ children }: Props) => {
    return (
      <FelaProvider
        renderer={renderer}
        Button={TouchableOpacity}
        Image={Image}
        Text={Text}
        TextInput={TextInput}
        View={View}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </FelaProvider>
    );
  };

  component.displayName = 'NativeFelaProvider';

  return component;
};

export default NativeFelaProvider;
