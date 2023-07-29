import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setHomePageFiltersAction, resetHomePageFiltersAction, setHomePageLoadingSuccessAction, setHomePageLoadingFailureAction, setHomePagePaginationPageAction, setHomePagePaginationLimitAction, setHomePageDraftLeadIdAction, resetHomePageDraftLeadIdAction, setHomePageBusinessIdsAction, resetHomePageBusinessIdsAction } from '../actions/homePageActions';

export interface IFilterAttributes {
  label: string;
  name: string;
  value: string;
  // handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IHomePageState {
  filters: IFilterAttributes[];
  page: number;
  pageLimit: number;
  draftLeadId: string;
  businessIds: string[];
  isLoading: boolean;
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

const initialState: IHomePageState = {
  filters: initialValue,
  page: 1,
  pageLimit: 10,
  draftLeadId: '',
  businessIds: [],
  isLoading: false,
};

const leadPageReducer = createReducer(initialState, (builder) => {
  builder
    // Handling local updates
    .addCase(setHomePageFiltersAction, (state, action: PayloadAction<IFilterAttributes[]>) => {
      state.filters = action.payload;
      state.isLoading = true;
    })
    .addCase(resetHomePageFiltersAction, (state) => {
      state.filters = initialValue;
    })
    .addCase(setHomePageLoadingSuccessAction, (state) => {
      state.isLoading = false;
    })
    .addCase(setHomePageLoadingFailureAction, (state) => {
      state.isLoading = false;
    })
    .addCase(setHomePagePaginationPageAction, (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    })
    .addCase(setHomePagePaginationLimitAction, (state, action: PayloadAction<number>) => {
      state.pageLimit = action.payload;
    })
    .addCase(setHomePageDraftLeadIdAction, (state, action: PayloadAction<string>) => {
      state.draftLeadId = action.payload;
    })
    .addCase(resetHomePageDraftLeadIdAction, (state, action: PayloadAction<string>) => {
      state.draftLeadId = '';
    })
    .addCase(setHomePageBusinessIdsAction, (state, action: PayloadAction<string[]>) => {
      state.businessIds = action.payload;
    })
    .addCase(resetHomePageBusinessIdsAction, (state) => {
      state.businessIds = [];
    });
});

export default leadPageReducer;
