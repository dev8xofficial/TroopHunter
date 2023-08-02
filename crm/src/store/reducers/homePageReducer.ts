import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setHomePageFiltersAction, resetHomePageFiltersAction, restoreHomePageFiltersAction, setHomePageLoadingSuccessAction, setHomePageLoadingFailureAction, setHomePagePaginationPageAction, setHomePagePaginationLimitAction, setHomePageDraftLeadIdAction, resetHomePageDraftLeadIdAction, setHomePageBusinessIdsAction, resetHomePageBusinessIdsAction } from '../actions/homePageActions';
import { ILeadCreationResponseAttributes } from '../../types/lead';

export interface IFilterAttributes {
  name: { label: string; name: string; value: string };
  businessDomain: { label: string; name: string; value?: string };
  address: { label: string; name: string; value?: string };
  cityId: { label: string; name: string; value?: string };
  stateId: { label: string; name: string; value?: string };
  countryId: { label: string; name: string; value?: string };
  phone: { label: string; name: string; value?: string };
  email: { label: string; name: string; value?: string };
  website: { label: string; name: string; value?: string };
  sponsoredAd: { label: string; name: string; value?: boolean };
}

export interface IHomePageState {
  filters: IFilterAttributes;
  page: number;
  pageLimit: number;
  draftLeadId: string;
  businessIds: string[];
  isLoading: boolean;
}

export const initialValue: IFilterAttributes = {
  name: { label: 'Business', name: 'name', value: null },
  businessDomain: { label: 'Business Domain', name: 'businessDomain', value: null },
  address: { label: 'Address', name: 'address', value: null },
  cityId: { label: 'City', name: 'cityId', value: null },
  stateId: { label: 'State', name: 'stateId', value: null },
  countryId: { label: 'Country', name: 'countryId', value: null },
  phone: { label: 'Phone', name: 'phone', value: null },
  email: { label: 'Email', name: 'email', value: null },
  website: { label: 'Website', name: 'website', value: null },
  sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: false },
};

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
    .addCase(setHomePageFiltersAction, (state, action: PayloadAction<IFilterAttributes>) => {
      state.filters = action.payload;
      state.isLoading = true;
    })
    .addCase(resetHomePageFiltersAction, (state) => {
      state.filters = initialValue;
    })
    .addCase(restoreHomePageFiltersAction, (state, action: PayloadAction<ILeadCreationResponseAttributes>) => {
      const lead = action.payload;
      const filterValues = {
        name: { label: 'Business', name: 'name', value: lead.search },
        businessDomain: { label: 'Business Domain', name: 'businessDomain', value: lead.businessDomain },
        address: { label: 'Address', name: 'address', value: lead.address },
        cityId: { label: 'City', name: 'cityId', value: lead.cityId },
        stateId: { label: 'State', name: 'stateId', value: lead.stateId },
        countryId: { label: 'Country', name: 'countryId', value: lead.countryId },
        phone: { label: 'Phone', name: 'phone', value: null },
        email: { label: 'Email', name: 'email', value: lead.email },
        website: { label: 'Website', name: 'website', value: lead.website },
        sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: lead.sponsoredAd },
      };
      state.filters = filterValues;
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
