import { createAction } from '@reduxjs/toolkit';

export const setLeadsPageSelectedLeadIds = createAction<string[]>('lead/setLeadsPageSelectedLeadIds');
export const resetLeadsPageSelectedLeadIds = createAction('lead/resetLeadsPageSelectedLeadIds');

export const resetLeadsPageAction = createAction('lead/resetLeadsPageAction');
