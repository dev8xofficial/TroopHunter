import { createAction } from '@reduxjs/toolkit';
import { IBusiness } from '../../types/business';

export interface IBusinessPayload extends Omit<IBusiness, 'name'> {
  name?: string; // converting name property from required to optional
  token: string;
}

export interface IBusinessSuccessPayload {
  data: { businesses: { [key: string]: IBusiness }; totalPages: number | null; totalRecords: number | null };
}

export const fetchBusinesses = createAction<IBusinessPayload>('business/fetchBusinesses');
export const fetchBusinessesSuccess = createAction<IBusinessSuccessPayload>('business/fetchBusinessesSuccess');
export const fetchBusinessesFailure = createAction('business/fetchBusinessesFailure');
