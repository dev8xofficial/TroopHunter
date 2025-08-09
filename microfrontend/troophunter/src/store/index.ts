  import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
  import { persistStore } from 'redux-persist';
  import createSagaMiddleware from 'redux-saga';

  import persistedReducer from './persistConfig';
  import rootSaga from './rootSaga';
  import apiMiddleware from '../middleware/apiMiddleware'; // Import your apiMiddleware

  const sagaMiddleware = createSagaMiddleware();

  // Configure custom middleware including apiMiddleware
  const middleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // Ignore checking non-serializable actions for this middleware
        ignoredActions: ['api', 'auth/authLoginAction', 'auth/authLoginSuccessAction', 'auth/authSignOutAction', 'auth/authSignOutSuccessAction', 'auth/authRegisterAction', 'auth/authRegisterSuccessAction', 'persist/PERSIST']
      }
    }),
    sagaMiddleware,
    apiMiddleware
  ];

  const store = configureStore({
    reducer: persistedReducer,
    middleware
  });

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  export { store, persistor };
