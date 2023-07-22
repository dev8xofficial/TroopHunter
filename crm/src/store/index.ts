import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
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

const persistConfig = {
  key: 'root', // Key to define the root of your state object in localforage
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { store, persistor };
