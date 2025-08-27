import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/authReducer';
import businessReducer from './reducers/businessReducer';
import homePageReducer from './reducers/homePageReducer';
import leadReducer from './reducers/leadsPageReducer';
import navigationReducer from './reducers/navigationReducer';
import userReducer from './reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'users'] // Add the names of the reducers you want to persist here
};

const rootReducer = combineReducers({
  navigation: navigationReducer,
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
  home: homePageReducer,
  leads: leadReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
