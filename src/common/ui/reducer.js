// @flow
import type {
  UIState,
  ToggleGalleryScrollEnabledAction,
  AppStartedAction,
} from '../types';
import R from 'ramda';

type Action = ToggleGalleryScrollEnabledAction;

export const initialState = {
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

const reducer = (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case 'TOGGLE_GALLERY_SCROLL_ENABLED': {
      return R.set(lens, action.payload, R.view(lens, state));
    }

    default: {
      return state;
    }
  }
};

export default reducer;
