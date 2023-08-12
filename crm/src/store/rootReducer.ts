import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import businessReducer from './reducers/businessReducer';
import homePageReducer from './reducers/homePageReducer';
import leadReducer from './reducers/leadsPageReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
  home: homePageReducer,
  leads: leadReducer
});

export default rootReducer;
