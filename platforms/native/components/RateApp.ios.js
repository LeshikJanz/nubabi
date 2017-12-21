// @flow
import React from 'react';
import * as StoreReview from 'react-native-store-review';
import Text from './Text';
import ListItem from './ListItem';

export const requestReview = () => {
  StoreReview.requestReview();
};

export const RateApp = () => {
  return (
    <ListItem
      leftIcon="ios-appstore"
      leftIconStyle={{ marginTop: 2 }}
      onPress={requestReview}
    >
      <Text color="secondary">Rate Nubabi</Text>
    </ListItem>
  );
};

export default RateApp;
