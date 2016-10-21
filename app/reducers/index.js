import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import tabReducer from './tabReducer';
import thisWeeksReducer from './thisWeeksReducer';
import babyReducer from './babyReducer';
import user from './user';

const rootReducer = combineReducers({
  navigationReducer,
  tabReducer,
  thisWeeksReducer,
  babyReducer,
  user,
});

export default rootReducer;
