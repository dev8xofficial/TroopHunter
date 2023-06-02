import { createReducer } from '@reduxjs/toolkit';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
import { IBusiness } from '../../types/business';

export interface BusinessState {
  businesses: IBusiness[];
  error: string | null;
}

const initialState: BusinessState = {
  businesses: [],
  error: null,
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBusinessesSuccess, (state, action) => {
      state.businesses = action.payload;
      state.error = null;
    })
    .addCase(fetchBusinessesFailure, (state, action) => {
      state.businesses = [];
      state.error = action.payload;
    });
});

export default businessReducer;
