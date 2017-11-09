// @flow
import type { Event } from 'react-native';
import { Dimensions } from 'react-native';
import { getContext } from 'recompose';
import PropTypes from 'prop-types';
import hoistStatics from './hoistStatics';

type LayoutState = {
  layout: {
    viewportWidth: number,
    viewportHeight: number,
    parentWidth: ?number,
    parentHeight: ?number,
  },
};

export function getLayoutInitialState() {
  const state: LayoutState = {
    layout: {
      viewportWidth: Dimensions.get('window').width,
      viewportHeight: Dimensions.get('window').height,
      parentWidth: null,
      parentHeight: null,
    },
  };

  return state;
}

export function getChildContext() {
  return {
    layout: {
      ...this.state.layout,
    },
  };
}

export const childContextTypes = {
  layout: PropTypes.shape({
    viewportWidth: PropTypes.number,
    viewportHeight: PropTypes.number,
    parentWidth: PropTypes.number,
    parentHeight: PropTypes.number,
  }),
};

export function handleLayout(event: Event) {
  const state = this.state.layout;
  const { width: parentWidth, height: parentHeight } = event.nativeEvent.layout;

  const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    'window',
  );

  const parentChanged =
    state.parentWidth !== parentWidth || state.parentHeight !== parentHeight;

  if (parentChanged) {
    this.setState({
      layout: {
        viewportWidth,
        viewportHeight,
        parentWidth,
        parentHeight,
      },
    });
  }
}

export default hoistStatics(getContext({ layout: PropTypes.object }));
