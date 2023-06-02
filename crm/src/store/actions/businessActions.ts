import { createAction } from '@reduxjs/toolkit';

export const fetchBusinesses = createAction('business/fetchBusinesses');
export const fetchBusinessesSuccess = createAction('business/fetchBusinessesSuccess');
export const fetchBusinessesFailure = createAction('business/fetchBusinessesFailure');
