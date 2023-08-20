import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { type IAuthState } from './reducers/authReducer';
import businessReducer, { type IBusinessState } from './reducers/businessReducer';
import homePageReducer, { type IHomePageState } from './reducers/homePageReducer';
import leadReducer, { type ILeadsState } from './reducers/leadsPageReducer';
import navigationReducer, { type INavigationState } from './reducers/navigationReducer';
import userReducer, { type IUserState } from './reducers/userReducer';

export interface IRootState {
  navigation: INavigationState;
  auth: IAuthState;
  users: IUserState;
  businesses: IBusinessState;
  home: IHomePageState;
  leads: ILeadsState;
  // Other slices of your store
}

const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
  home: homePageReducer,
  leads: leadReducer
});

export default rootReducer;
