import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction } from '../actions/businessActions';
import { IBusinessAttributes } from 'validator/interfaces/Business';

export interface IBusinessState {
  data: { businesses: { [key: string]: IBusinessAttributes }; totalPages: number; totalRecords: number };
}

const initialState: IBusinessState = {
  data: { businesses: {}, totalPages: 0, totalRecords: 0 },
};

const businessReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBusinessesSuccessAction, (state, action: PayloadAction<IBusinessState>) => {
      state.data = action.payload.data;
    })
    .addCase(fetchBusinessesFailureAction, (state, action) => {
      state.data = { businesses: {}, totalPages: null, totalRecords: null };
    });
});

export default businessReducer;
