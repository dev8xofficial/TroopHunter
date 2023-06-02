import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import businessReducer from './reducers/businessReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
});

export default rootReducer;
