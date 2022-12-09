import { combineReducers } from 'redux';
import createReducer from './create';
import quizReducer from './quiz';
import authReducer from './auth';

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
});
