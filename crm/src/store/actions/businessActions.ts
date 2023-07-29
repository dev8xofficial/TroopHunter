import { createAction } from '@reduxjs/toolkit';
import { IBusinessState } from '../reducers/businessReducer';
import { IBusinessesFetchPayload } from '../sagas/businessSaga';

export const fetchBusinessesAction = createAction<IBusinessesFetchPayload>('business/fetchBusinessesAction');
export const fetchBusinessesSuccessAction = createAction<IBusinessState>('business/fetchBusinessesSuccessAction');
export const fetchBusinessesFailureAction = createAction('business/fetchBusinessesFailureAction');
