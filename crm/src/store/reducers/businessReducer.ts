import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type IBusinessAttributes } from 'validator/interfaces';

import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction } from '../actions/businessActions';

export interface IBusinessState {
  data: { businesses: Record<string, IBusinessAttributes>; totalPages: number; totalRecords: number };
}

const initialState: IBusinessState = {
  data: { businesses: {}, totalPages: 0, totalRecords: 0 }
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBusinessesSuccessAction, (state, action: PayloadAction<IBusinessState>) => {
      state.data = action.payload.data;
    })
    .addCase(fetchBusinessesFailureAction, (state) => {
      state.data = { businesses: {}, totalPages: 0, totalRecords: 0 };
    });
});

export default businessReducer;
