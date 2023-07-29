import { createAction } from '@reduxjs/toolkit';
import { IFilterAttributes } from '../reducers/homePageReducer';

export const setHomePageFiltersAction = createAction<IFilterAttributes[]>('homePage/setHomePageFiltersAction');
export const resetHomePageFiltersAction = createAction('homePage/resetHomePageFiltersAction');

export const setHomePageLoadingSuccessAction = createAction('homePage/setHomePageLoadingSuccessAction');
export const setHomePageLoadingFailureAction = createAction('homePage/setHomePageLoadingFailureAction');

export const setHomePagePaginationPageAction = createAction<number>('homePage/setHomePagePaginationPageAction');
export const setHomePagePaginationLimitAction = createAction<number>('homePage/setHomePagePaginationLimitAction');
export const setHomePageDraftLeadIdAction = createAction<string>('homePage/setHomePageDraftLeadIdAction');

export const setHomePageBusinessIdsAction = createAction<string[]>('homePage/setHomePageBusinessIdsAction');
export const resetHomePageBusinessIdsAction = createAction('homePage/resetHomePageBusinessIdsAction');
