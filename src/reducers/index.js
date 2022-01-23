import { combineReducers } from 'redux';
import fetchDataReducer from './fetchDataReducer';
import filterDataReducer from './filterDataReducer';

export default combineReducers({
  fetchDataReducer,
  filterDataReducer
});