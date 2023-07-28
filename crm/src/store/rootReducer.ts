import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import businessReducer from './reducers/businessReducer';
import leadReducer from './reducers/leadReducer';
import leadPageReducer from './reducers/leadPageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
  lead: leadReducer,
  leadPage: leadPageReducer,
});

export default rootReducer;
