import { type PayloadAction, createReducer } from '@reduxjs/toolkit';

import { resetNavigationAction, setNavigationOptions, setTargetRoute } from '../actions/navigationActions';

export interface INavigationState {
  targetRoute: string;
  navigationOptions: object;
}

const initialState: INavigationState = {
  targetRoute: '',
  navigationOptions: {}
};

const navigationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTargetRoute, (state, action: PayloadAction<string>) => {
      state.targetRoute = action.payload;
    })
    .addCase(setNavigationOptions, (state, action) => {
      state.navigationOptions = action.payload;
    })
    .addCase(resetNavigationAction, (state) => {
      state.targetRoute = '';
      state.navigationOptions = {};
    });
});

export default navigationReducer;
