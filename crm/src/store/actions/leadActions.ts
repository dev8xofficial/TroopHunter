import { createAction } from '@reduxjs/toolkit';
import { ICreateLeadPayload, IDeleteLeadPayload, IDeleteLeadsPayload, IUpdateLeadPayload } from '../sagas/leadSaga';

export const createLeadAction = createAction<ICreateLeadPayload>('lead/createLeadAction');

export const updateLeadAction = createAction<IUpdateLeadPayload>('lead/updateLeadAction');

export const deleteLeadAction = createAction<IDeleteLeadPayload>('lead/deleteLeadAction');

export const deleteLeadsAction = createAction<IDeleteLeadsPayload>('lead/deleteLeadsAction');
