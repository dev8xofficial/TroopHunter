import { createAction } from '@reduxjs/toolkit';
import { IBusiness } from '../../types/business';

export interface IBusinessesFetchPayload extends Omit<IBusiness, 'name'> {
  name?: string; // converting name property from required to optional
  token: string;
}

export interface IBusinessesFetchSuccessPayload {
  data: { businesses: { [key: string]: IBusiness }; totalPages: number | null; totalRecords: number | null };
}

export const fetchBusinessesAction = createAction<IBusinessesFetchPayload>('business/fetchBusinesses');
export const fetchBusinessesSuccessAction = createAction<IBusinessesFetchSuccessPayload>('business/fetchBusinessesSuccess');
export const fetchBusinessesFailureAction = createAction('business/fetchBusinessesFailure');
