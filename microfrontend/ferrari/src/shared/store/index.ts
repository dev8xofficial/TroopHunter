import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production'
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
