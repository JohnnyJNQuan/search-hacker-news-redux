import { combineReducers } from 'redux';
import searchState from './searchReducer';

const rootReducer = combineReducers({
  searchState,
});

export default rootReducer;
