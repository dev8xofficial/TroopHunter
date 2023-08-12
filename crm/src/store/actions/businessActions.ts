import { createAction } from '@reduxjs/toolkit';

import { type IBusinessState } from '../reducers/businessReducer';
import { type IBusinessesFetchPayload } from '../sagas/businessSaga';

export const fetchBusinessesAction = createAction<IBusinessesFetchPayload>('business/fetchBusinessesAction');
export const fetchBusinessesSuccessAction = createAction<IBusinessState>('business/fetchBusinessesSuccessAction');
export const fetchBusinessesFailureAction = createAction('business/fetchBusinessesFailureAction');
