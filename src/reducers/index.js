import { combineReducers } from 'redux';
import addPatient from './addPatient';
import alert from './alert';

export default combineReducers({
  addPatient,
  alert,
});
