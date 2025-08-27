import { createAction } from '@reduxjs/toolkit';

import { type IBusinessState } from '../reducers/businessReducer';
import { type IBusinessesFetchSuccessPayload, type IBusinessesFetchPayload } from '../sagas/business/business.fetch';

export const fetchBusinessesAction = createAction<IBusinessesFetchPayload>('business/fetchBusinessesAction');
export const fetchBusinessesSuccessAction = createAction<IBusinessesFetchSuccessPayload>('business/fetchBusinessesSuccessAction');

export const addBusinessesLocallyAction = createAction<IBusinessState>('business/addBusinessesLocallyAction');
export const failedToAddBusinessesLocallyAction = createAction('business/failedToAddBusinessesLocallyAction');

export const resetBusinessAction = createAction('business/resetBusinessAction');
