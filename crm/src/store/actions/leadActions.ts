import { createAction } from '@reduxjs/toolkit';

import { type ICreateLeadPayload, type IDeleteLeadPayload, type IDeleteLeadsPayload, type IUpdateLeadPayload } from '../sagas/leadSaga';

export const createLeadAction = createAction<ICreateLeadPayload>('lead/createLeadAction');
export const updateLeadAction = createAction<IUpdateLeadPayload>('lead/updateLeadAction');
export const deleteLeadAction = createAction<IDeleteLeadPayload>('lead/deleteLeadAction');
export const deleteLeadsAction = createAction<IDeleteLeadsPayload>('lead/deleteLeadsAction');
