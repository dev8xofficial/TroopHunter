import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type IBusinessAttributes } from 'validator/interfaces';

import { addBusinessesLocallyAction, failedToAddBusinessesLocallyAction, resetBusinessAction } from '../actions/businessActions';

export interface IBusinessStateData {
  businesses: Record<string, IBusinessAttributes>;
  totalPages: number;
  totalRecords: number;
}

export interface IBusinessState {
  data: IBusinessStateData;
}

const initialState: IBusinessState = {
  data: { businesses: {}, totalPages: 0, totalRecords: 0 }
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBusinessesLocallyAction, (state, action: PayloadAction<IBusinessState>) => {
      state.data = action.payload.data;
    })
    .addCase(failedToAddBusinessesLocallyAction, (state) => {
      state.data = { businesses: {}, totalPages: 0, totalRecords: 0 };
    })
    .addCase(resetBusinessAction, (state) => {
      state.data = { businesses: {}, totalPages: 0, totalRecords: 0 };
    });
});

export default businessReducer;
