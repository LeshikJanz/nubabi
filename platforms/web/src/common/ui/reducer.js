// @flow
import type {
  UIState,
  ToggleGalleryScrollEnabledAction,
  ToggleNetworkIndicatorAction
} from "../types";
import rLens from "ramda/src/lens";
import rPath from "ramda/src/path";
import set from "ramda/src/set";
import assoc from "ramda/src/assoc";
import assocPath from "ramda/src/assocPath";
import view from "ramda/src/view";

type Action = ToggleGalleryScrollEnabledAction | ToggleNetworkIndicatorAction;

export const initialState = {
  showNetworkIndicator: false,
  gallery: {
    scrollEnabled: true
  }
};

const path = ["gallery", "scrollEnabled"];
export const lens = rLens(rPath(path), assocPath(path));

export const toggleGalleryScroll = (isEnabled: boolean): Action => {
  return {
    type: "TOGGLE_GALLERY_SCROLL_ENABLED",
    payload: isEnabled
  };
};

export const toggleNetworkActivityIndicator = (shouldShow: boolean) => {
  return {
    type: "TOGGLE_NETWORK_ACTIVITY_INDICATOR",
    payload: shouldShow
  };
};

const reducer = (state: UIState = initialState, action: Action): UIState => {
  switch (action.type) {
    case "TOGGLE_GALLERY_SCROLL_ENABLED": {
      return set(lens, action.payload, view(lens, state));
    }

    case "TOGGLE_NETWORK_ACTIVITY_INDICATOR": {
      return assoc("showNetworkIndicator", action.payload, state);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
