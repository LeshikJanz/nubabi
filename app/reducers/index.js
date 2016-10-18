import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import tabReducer from './tabReducer';
import thisWeeksReducer from './thisWeeksReducer';
import babyReducer from './babyReducer';

const rootReducer = combineReducers({
  navigationReducer,
  tabReducer,
  thisWeeksReducer,
  babyReducer,
});

export default rootReducer;
