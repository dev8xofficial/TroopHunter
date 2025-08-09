import { type PayloadAction, createReducer } from '@reduxjs/toolkit';

import { setLeadsPageSelectedLeadIds, resetLeadsPageSelectedLeadIds, resetLeadsPageAction } from '../actions/leadsPageActions';

export interface ILeadsState {
  selectedLeadIds: string[];
}

const initialState: ILeadsState = { selectedLeadIds: [] };

const leadReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setLeadsPageSelectedLeadIds, (state, action: PayloadAction<string[]>) => {
      const ids = action.payload;
      state.selectedLeadIds = ids;
    })
    .addCase(resetLeadsPageSelectedLeadIds, (state) => {
      state.selectedLeadIds = [];
    })
    .addCase(resetLeadsPageAction, (state) => {
      state.selectedLeadIds = [];
    });
});

export default leadReducer;
