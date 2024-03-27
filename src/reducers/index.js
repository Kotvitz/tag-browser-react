import { combineReducers } from 'redux';
import tagsReducer from './tagsReducer';

const rootReducer = combineReducers({
  tags: tagsReducer,
});

export default rootReducer;