// @flow
import type { Action } from '../types';
import { getBabySuccess, getBabyFailure } from '../actions';

export const initialState = {
  id: '',
  name: '',
  avatar: { url: '' },
  coverImage: { url: '' },
  weight: '',
  height: '',
  error: '',
};

const reducer = (state: initialState = initialState, action: Action) => {
  switch (action.type) {
    case getBabySuccess().type:
      console.log('action.payload');
      console.log(action.payload);

      return {
        ...state,
        ...action.payload,
      };
    case getBabyFailure().type:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
