// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import localforage from 'localforage';

const sagaMiddleware = createSagaMiddleware();

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'crm_database',
  version: 1,
  storeName: 'data_store',
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

// Function to persist specific parts of the state to localforage
const persistStateToStorage = () => {
  const state = store.getState();
  // Save the required parts of the state to localforage
  localforage.setItem('auth', state.auth);
  localforage.setItem('users', state.users);
  localforage.setItem('businesses', state.businesses);
};

// Subscribe to store changes and persist state to localforage
store.subscribe(persistStateToStorage);

export default store;
