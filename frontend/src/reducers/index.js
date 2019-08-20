import loginReducer from './loginReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;
