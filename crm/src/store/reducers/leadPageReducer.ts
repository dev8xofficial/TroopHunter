import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setLeadFiltersAction, setLeadFilterLoadingSuccessAction, setLeadFilterLoadingFailureAction } from '../actions/leadPageActions';

export interface IFilterAttributes {
  label: string;
  name: string;
  value: string;
  // handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface LeadPageState {
  leadFilters: IFilterAttributes[];
  isLoading: boolean;
}

const initialState: LeadPageState = {
  leadFilters: [
    { label: 'Business', name: 'name', value: '' },
    { label: 'Business Domain', name: 'businessDomain', value: '' },
    { label: 'Address', name: 'address', value: '' },
    { label: 'Location', name: 'location', value: '' },
    { label: 'Phone', name: 'phone', value: '' },
    { label: 'Email', name: 'email', value: '' },
    { label: 'Website', name: 'website', value: '' },
    { label: 'Sponsored', name: 'sponsoredAd', value: 'false' },
  ],
  isLoading: false,
};

const leadPageReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setLeadFiltersAction, (state, action: PayloadAction<IFilterAttributes[]>) => {
      state.leadFilters = action.payload;
      state.isLoading = true;
    })
    .addCase(setLeadFilterLoadingSuccessAction, (state) => {
      state.isLoading = false; // Set isLoading to false when businesses are successfully fetched
    })
    .addCase(setLeadFilterLoadingFailureAction, (state) => {
      state.isLoading = false; // Set isLoading to false when businesses fetching fails
    });
});

export default leadPageReducer;
