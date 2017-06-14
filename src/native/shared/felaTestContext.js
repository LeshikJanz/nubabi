import React from 'react';
import { NativeFelaProvider } from '../components/FelaProvider';
import { createRenderer } from 'fela-native';
import theme from '../../common/themes/defaultTheme';

export const renderer = createRenderer();
const FelaProvider = NativeFelaProvider(renderer, theme);

const felaTestContext = component => (
  <FelaProvider>
    {component}
  </FelaProvider>
);

export default felaTestContext;
