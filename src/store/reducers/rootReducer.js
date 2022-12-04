import { combineReducers } from 'redux';
import createReducer from './create';
import quizReducer from './quiz';

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
});
