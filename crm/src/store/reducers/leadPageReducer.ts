import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setLeadFiltersAction, resetLeadFiltersAction, setLeadFilterLoadingSuccessAction, setLeadFilterLoadingFailureAction, setLeadPageAction, setLeadPageLimitAction, setDraftLeadIdAction } from '../actions/leadPageActions';

export interface IFilterAttributes {
  label: string;
  name: string;
  value: string;
  // handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface LeadPageState {
  leadFilters: IFilterAttributes[];
  leadPage: number;
  leadPageLimit: number;
  isLoading: boolean;
  draftLeadId?: string;
}

const initialValue = [
  { label: 'Business', name: 'name', value: '' },
  { label: 'Business Domain', name: 'businessDomain', value: '' },
  { label: 'Address', name: 'address', value: '' },
  { label: 'Location', name: 'location', value: '' },
  { label: 'Phone', name: 'phone', value: '' },
  { label: 'Email', name: 'email', value: '' },
  { label: 'Website', name: 'website', value: '' },
  { label: 'Sponsored', name: 'sponsoredAd', value: 'false' },
];

const initialState: LeadPageState = {
  leadFilters: initialValue,
  leadPage: 1,
  leadPageLimit: 10,
  isLoading: false,
};

const leadPageReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setLeadFiltersAction, (state, action: PayloadAction<IFilterAttributes[]>) => {
      state.leadFilters = action.payload;
      state.isLoading = true;
    })
    .addCase(resetLeadFiltersAction, (state) => {
      state.leadFilters = initialValue;
    })
    .addCase(setLeadFilterLoadingSuccessAction, (state) => {
      state.isLoading = false; // Set isLoading to false when businesses are successfully fetched
    })
    .addCase(setLeadFilterLoadingFailureAction, (state) => {
      state.isLoading = false; // Set isLoading to false when businesses fetching fails
    })
    .addCase(setLeadPageAction, (state, action: PayloadAction<number>) => {
      state.leadPage = action.payload; // Set isLoading to false when businesses are successfully fetched
    })
    .addCase(setLeadPageLimitAction, (state, action: PayloadAction<number>) => {
      state.leadPageLimit = action.payload; // Set isLoading to false when businesses fetching fails
    })
    .addCase(setDraftLeadIdAction, (state, action: PayloadAction<string>) => {
      state.draftLeadId = action.payload; // Set isLoading to false when businesses fetching fails
    });
});

export default leadPageReducer;
