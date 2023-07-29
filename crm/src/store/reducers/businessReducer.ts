import { createReducer } from '@reduxjs/toolkit';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction } from '../actions/businessActions';
import { IBusiness } from '../../types/business';

export interface BusinessState {
  data: { businesses: { [key: string]: IBusiness }; totalPages: number | null; totalRecords: number | null };
}

const initialState: BusinessState = {
  data: { businesses: {}, totalPages: null, totalRecords: null },
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBusinessesSuccessAction, (state, action) => {
      state.data = action.payload.data;
    })
    .addCase(fetchBusinessesFailureAction, (state, action) => {
      state.data = { businesses: {}, totalPages: null, totalRecords: null };
    });
});

export default businessReducer;
