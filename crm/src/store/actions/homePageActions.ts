import { createAction } from '@reduxjs/toolkit';
import { type ILeadAttributes } from 'validator/interfaces';

import { type IFilterAttributes } from '../reducers/homePageReducer';

export const setHomePageFiltersAction = createAction<IFilterAttributes>('homePage/setHomePageLFiltersAction');
export const resetHomePageFiltersAction = createAction('homePage/resetHomePageFiltersAction');
export const restoreHomePageFiltersAction = createAction<ILeadAttributes>('homePage/restoreHomePageFiltersAction');

export const setHomePageLoadingSuccessAction = createAction('homePage/setHomePageLoadingSuccessAction');
export const setHomePageLoadingFailureAction = createAction('homePage/setHomePageLoadingFailureAction');

export const setHomePagePaginationPageAction = createAction<number>('homePage/setHomePagePaginationPageAction');
export const setHomePagePaginationLimitAction = createAction<number>('homePage/setHomePagePaginationLimitAction');
export const setHomePageDraftLeadIdAction = createAction<string>('homePage/setHomePageDraftLeadIdAction');
export const resetHomePageDraftLeadIdAction = createAction<string>('homePage/resetHomePageDraftLeadIdAction');

export const setHomePageBusinessIdsAction = createAction<{ businessIds: string[]; draftLeadBusinessIds: string[] }>('homePage/setHomePageBusinessIdsAction');
export const resetHomePageBusinessIdsAction = createAction('homePage/resetHomePageBusinessIdsAction');

export const setHomePageRemoveSavedBusinessAction = createAction<boolean>('homePage/setHomePageRemoveSavedBusinessAction');

export const resetHomePageAction = createAction('homePage/resetHomePageAction');
