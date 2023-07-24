import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import businessReducer from './reducers/businessReducer';
import leadPageReducer from './reducers/leadPageReducer';
import listsPageReducer from './reducers/listsPageReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
  lead: leadPageReducer,
  lists: listsPageReducer,
});

export default rootReducer;
