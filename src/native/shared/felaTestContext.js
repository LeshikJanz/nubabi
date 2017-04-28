import React from 'react';
import { NativeFelaProvider } from '../components/FelaProvider';
import { createRenderer } from 'fela-native';
import theme from '../../common/themes/defaultTheme';

const FelaProvider = NativeFelaProvider(createRenderer(), theme);

const felaTestContext = component => (
  <FelaProvider>
    {component}
  </FelaProvider>
);

export default felaTestContext;
