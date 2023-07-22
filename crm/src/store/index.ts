import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, Transform } from 'redux-persist';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import localforage from 'localforage';
import CryptoJS from 'crypto-js';

const sagaMiddleware = createSagaMiddleware();

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'crm_database',
  version: 1,
  storeName: 'data_store',
});

// Get the encryption key from the environment variable
const encryptionKey = process.env.ENCRYPTION_KEY;
debugger;

const encryptTransform: Transform<any, any, any, any> = {
  // Encrypt data before saving it to IndexedDB
  in: (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    return encryptedData;
  },
  // Decrypt data when retrieving it from IndexedDB
  out: (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },
};

const persistConfig = {
  key: 'root',
  storage: localforage,
  transforms: [encryptTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { store, persistor };
