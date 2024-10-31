import { createAction } from '@reduxjs/toolkit';

import { type ICreateLeadSuccessPayload, type ICreateLeadPayload, type IDeleteLeadPayload, type IDeleteLeadsPayload, type IUpdateLeadPayload, type IUpdateLeadSuccessPayload, type IDeleteLeadSuccessPayload, type IDeleteLeadsSuccessPayload } from '../sagas/lead';

export const createLeadAction = createAction<ICreateLeadPayload>('lead/createLeadAction');
export const createLeadSuccessAction = createAction<ICreateLeadSuccessPayload>('lead/createLeadSuccessAction');
export const updateLeadAction = createAction<IUpdateLeadPayload>('lead/updateLeadAction');
export const updateLeadSuccessAction = createAction<IUpdateLeadSuccessPayload>('lead/updateLeadSuccessAction');
export const deleteLeadAction = createAction<IDeleteLeadPayload>('lead/deleteLeadAction');
export const deleteLeadSuccessAction = createAction<IDeleteLeadSuccessPayload>('lead/deleteLeadSuccessAction');
export const deleteLeadsAction = createAction<IDeleteLeadsPayload>('lead/deleteLeadsAction');
export const deleteLeadsSuccessAction = createAction<IDeleteLeadsSuccessPayload>('lead/deleteLeadsSuccessAction');
