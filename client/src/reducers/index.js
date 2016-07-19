import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form, // ES6 shortcut equivalent to 'form: from'
  auth: authReducer
});

export default rootReducer;
