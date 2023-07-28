import { createAction } from '@reduxjs/toolkit';
import { IFilterAttributes } from '../reducers/leadPageReducer';

export const setLeadFiltersAction = createAction<IFilterAttributes[]>('lead/setLeadFiltersAction');
export const resetLeadFiltersAction = createAction('lead/resetLeadFiltersAction');

export const setLeadFilterLoadingSuccessAction = createAction('lead/setLeadFilterLoadingSuccessAction');
export const setLeadFilterLoadingFailureAction = createAction('lead/setLeadFilterLoadingFailureAction');

export const setLeadPageAction = createAction<number>('lead/setLeadPageAction');
export const setLeadPageLimitAction = createAction<number>('lead/setLeadPageLimitAction');
export const setDraftLeadIdAction = createAction<string>('lead/setDraftLeadIdAction');

export const setLeadBusinessIdsAction = createAction<string[]>('lead/setLeadBusinessIdsAction');
export const resetLeadBusinessIdsAction = createAction('lead/resetLeadBusinessIdsAction');
