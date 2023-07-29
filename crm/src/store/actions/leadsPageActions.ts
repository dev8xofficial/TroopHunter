import { createAction } from '@reduxjs/toolkit';

export const setSelectedLeadIds = createAction<string[]>('lead/setSelectedLeadIds');
export const resetSelectedLeadIds = createAction('lead/resetSelectedLeadIds');
