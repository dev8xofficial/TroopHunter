import { createAction } from '@reduxjs/toolkit';

export const setLeadsPageSelectedLeadIds = createAction<string[]>('lead/setLeadsPageSelectedLeadIds');
export const resetLeadsPageSelectedLeadIds = createAction('lead/resetLeadsPageSelectedLeadIds');
