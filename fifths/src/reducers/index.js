import { combineReducers } from 'redux';
import keys from './keys';
import art from './art';

// combines the two redux reducers to be used when setting up the redux state/store
const AppReducer = combineReducers({
  keys,
  art,
});

export default AppReducer;
