import { createReducer } from '@reduxjs/toolkit';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction } from '../actions/businessActions';
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
    .addCase(fetchBusinessesSuccessAction, (state, action) => {
      state.data = action.payload.data;
      state.error = null;
    })
    .addCase(fetchBusinessesFailureAction, (state, action) => {
      state.data = { businesses: {}, totalPages: null, totalRecords: null };
      state.error = action.payload;
    });
});

export default businessReducer;
