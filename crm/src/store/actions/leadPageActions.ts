import { createAction } from '@reduxjs/toolkit';
import { IFilterAttributes } from '../reducers/leadPageReducer';

export const setLeadFiltersAction = createAction<IFilterAttributes[]>('lead/setLeadFiltersAction');

export const setLeadFilterLoadingSuccessAction = createAction('lead/setLeadFilterLoadingSuccessAction');
export const setLeadFilterLoadingFailureAction = createAction('lead/setLeadFilterLoadingFailureAction');

export const setLeadPageAction = createAction<number>('lead/setLeadPageAction');
export const setLeadPageLimitAction = createAction<number>('lead/setLeadPageLimitAction');
