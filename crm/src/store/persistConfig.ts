import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import businessReducer from './reducers/businessReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Add the names of the reducers you want to persist here
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  businesses: businessReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
