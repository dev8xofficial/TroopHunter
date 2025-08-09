import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { Middleware } from '@reduxjs/toolkit';

import persistedReducer from './persistConfig';
import rootSaga from './rootSaga';
import apiMiddleware from '../middleware/apiMiddleware';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['api', 'auth/authLoginAction', 'auth/authLoginSuccessAction', 'auth/authSignOutAction', 'auth/authSignOutSuccessAction', 'auth/authRegisterAction', 'auth/authRegisterSuccessAction', 'persist/PERSIST']
      }
    }).concat(sagaMiddleware, apiMiddleware as Middleware)
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
