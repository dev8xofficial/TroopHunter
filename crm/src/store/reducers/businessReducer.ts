import { createReducer } from '@reduxjs/toolkit';
import { fetchBusinessesSuccess, fetchBusinessesFailure } from '../actions/businessActions';
import { IBusiness } from '../../types/business';

export interface BusinessState {
  data: { businesses: { [key: string]: IBusiness }; totalPages: number | null; totalRecords: number | null };
  error: string | null;
}

const initialState: BusinessState = {
  data: { businesses: {}, totalPages: null, totalRecords: null },
  error: null,
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBusinessesSuccess, (state, action) => {
      state.data = { ...state.data, ...action.payload.data };
      state.error = null;
    })
    .addCase(fetchBusinessesFailure, (state, action) => {
      state.data = { businesses: {}, totalPages: null, totalRecords: null };
      state.error = action.payload;
    });
});

export default businessReducer;
