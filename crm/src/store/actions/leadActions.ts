import { createAction } from '@reduxjs/toolkit';
import { ILead } from '../../types/lead';

export interface ILeadPayload extends ILead {
  token: string;
}

export const createLeadAction = createAction<ILeadPayload>('lead/createLead');
