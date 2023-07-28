import { createReducer } from '@reduxjs/toolkit';
import { setSelectedLeadIds, deleteLeadsSuccessAction, deleteLeadsFailureAction } from '../actions/leadActions';

export interface LeadsPageState {
  selectedLeadIds: string[];
}

const initialState: LeadsPageState = { selectedLeadIds: [] };

const leadReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setSelectedLeadIds, (state, action) => {
      const ids = action.payload;
      state.selectedLeadIds = ids;
    })
    .addCase(deleteLeadsSuccessAction, (state, action) => {
      state.selectedLeadIds = [];
    })
    .addCase(deleteLeadsFailureAction, (state, action) => {
      state.selectedLeadIds = state.selectedLeadIds;
    });
});

export default leadReducer;
