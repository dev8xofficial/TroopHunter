import { createReducer } from '@reduxjs/toolkit';
import { setSelectedLeadIds, deleteLeadsSuccessAction, deleteLeadsFailureAction } from '../actions/listsPageActions';

export interface ListsPageState {
  selectedLeadIds: string[];
}

const initialState: ListsPageState = { selectedLeadIds: [] };

const listsPageReducer = createReducer(initialState, (builder) => {
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

export default listsPageReducer;
