import { createReducer } from '@reduxjs/toolkit';
import { setSelectedLeadIds, resetSelectedLeadIds } from '../actions/leadsPageActions';

export interface LeadsState {
  selectedLeadIds: string[];
}

const initialState: LeadsState = { selectedLeadIds: [] };

const leadReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setSelectedLeadIds, (state, action) => {
      const ids = action.payload;
      state.selectedLeadIds = ids;
    })
    .addCase(resetSelectedLeadIds, (state, action) => {
      state.selectedLeadIds = [];
    });
});

export default leadReducer;
