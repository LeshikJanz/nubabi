// @flow
import type { State } from '../../common/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { onlyUpdateForKeys } from 'recompose';

type Props = {
  shouldShowNetworkIndicator?: boolean,
};

export const NetworkIndicator = ({
  shouldShowNetworkIndicator = false,
}: Props) => {
  return (
    <StatusBar networkActivityIndicatorVisible={shouldShowNetworkIndicator} />
  );
};

export default compose(
  connect((state: State) => ({
    shouldShowNetworkIndicator: state.ui.showNetworkIndicator,
  })),
  onlyUpdateForKeys(['shouldShowNetworkIndicator']),
)(NetworkIndicator);
