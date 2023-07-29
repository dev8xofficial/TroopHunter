import { createAction } from '@reduxjs/toolkit';
import { ILead } from '../../types/lead';
import { IUser } from '../../types/user';

export interface ICreateLeadPayload extends ILead {
  token: string;
}

export const createLeadAction = createAction<ICreateLeadPayload>('lead/createLeadAction');

export interface IUpdateLeadPayload extends ILead {
  token: string;
}

export const updateLeadAction = createAction<IUpdateLeadPayload>('lead/updateLeadAction');

export interface IDeleteLeadPayload {
  token: string;
  id: string;
  user: IUser;
}

export const deleteLeadAction = createAction<IDeleteLeadPayload>('lead/deleteLeadAction');

interface IDeleteLeadsPayload {
  token: string;
  user: IUser;
  selectedLeadIds: string[];
}

export const deleteLeadsAction = createAction<IDeleteLeadsPayload>('lead/deleteLeadsAction');
