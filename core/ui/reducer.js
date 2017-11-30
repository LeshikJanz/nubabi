// @flow
import type {
  UIState,
  ToggleGalleryScrollEnabledAction,
  ToggleNetworkIndicatorAction,
} from '../types';
import R from 'ramda';

type Action = ToggleGalleryScrollEnabledAction | ToggleNetworkIndicatorAction;

export const initialState = {
  showNetworkIndicator: false,
  gallery: {
    scrollEnabled: true,
  },
};

const path = ['gallery', 'scrollEnabled'];
export const lens = R.lens(R.path(path), R.assocPath(path));

export const toggleGalleryScroll = (isEnabled: boolean): Action => {
  return {
    type: 'TOGGLE_GALLERY_SCROLL_ENABLED',
    payload: isEnabled,
  };
};

export const toggleNetworkActivityIndicator = (shouldShow: boolean) => {
  return {
    type: 'TOGGLE_NETWORK_ACTIVITY_INDICATOR',
    payload: shouldShow,
  };
};

const reducer = (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case 'TOGGLE_GALLERY_SCROLL_ENABLED': {
      return R.set(lens, action.payload, R.view(lens, state));
    }

    case 'TOGGLE_NETWORK_ACTIVITY_INDICATOR': {
      return R.assoc('showNetworkIndicator', action.payload, state);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
