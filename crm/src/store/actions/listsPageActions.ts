import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';

export const setSelectedLeadIds = createAction<string[]>('lists/setSelectedLeadIds');

interface IDeleteLeadsPayload {
  token: string;
  user: IUser;
  selectedLeadIds: string[];
}

export const deleteLeadsAction = createAction<IDeleteLeadsPayload>('lists/deleteLeadsAction');
export const deleteLeadsSuccessAction = createAction('lists/deleteLeadsSuccessAction');
export const deleteLeadsFailureAction = createAction('lists/deleteLeadsFailureAction');
