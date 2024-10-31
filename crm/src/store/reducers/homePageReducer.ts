import { type PayloadAction, createReducer } from '@reduxjs/toolkit';
import { type ILeadAttributes } from 'validator/interfaces';

import { setHomePageFiltersAction, resetHomePageFiltersAction, restoreHomePageFiltersAction, setHomePageLoadingSuccessAction, setHomePageLoadingFailureAction, setHomePagePaginationPageAction, setHomePagePaginationLimitAction, setHomePageDraftLeadIdAction, resetHomePageDraftLeadIdAction, setHomePageBusinessIdsAction, resetHomePageBusinessIdsAction, resetHomePageAction, setHomePageRemoveSavedBusinessAction } from '../actions/homePageActions';

export interface IFilterOptionAttributes {
  label: string;
  name: string;
  value?: string;
}

export interface IFilterAttributes {
  name: { label: string; name: string; value: string };
  view: { label: string; name: string; value: string };
  sort: { label: string; name: string; value: string };
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
  removeSavedBusinesses: boolean;
  isLoading: boolean;
}

export const initialValue: IFilterAttributes = {
  name: { label: 'Business', name: 'name', value: '' },
  view: { label: 'Business', name: 'view', value: 'all' },
  sort: { label: 'Sort', name: 'sort', value: 'relevance' },
  businessDomain: { label: 'Business Domain', name: 'businessDomain', value: '' },
  address: { label: 'Address', name: 'address', value: '' },
  cityId: { label: 'City', name: 'cityId', value: '' },
  stateId: { label: 'State', name: 'stateId', value: '' },
  countryId: { label: 'Country', name: 'countryId', value: '' },
  phone: { label: 'Phone', name: 'phone', value: '' },
  email: { label: 'Email', name: 'email', value: '' },
  website: { label: 'Website', name: 'website', value: '' },
  sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: false }
};

const initialState: IHomePageState = {
  filters: initialValue,
  page: 1,
  pageLimit: 10,
  draftLeadId: '',
  businessIds: [],
  removeSavedBusinesses: false,
  isLoading: false
};

const leadPageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setHomePageFiltersAction, (state, action: PayloadAction<IFilterAttributes>) => {
      state.filters = action.payload;
      state.page = 1;
      state.isLoading = true;
    })
    .addCase(resetHomePageFiltersAction, (state) => {
      state.filters = initialValue;
    })
    .addCase(restoreHomePageFiltersAction, (state, action: PayloadAction<ILeadAttributes>) => {
      const lead = action.payload;
      const filterValues = {
        name: { label: 'Business', name: 'name', value: lead.search },
        view: { label: 'Business', name: 'view', value: initialValue.view.value },
        sort: { label: 'Sort', name: 'sort', value: initialValue.sort.value },
        businessDomain: { label: 'Business Domain', name: 'businessDomain', value: lead.businessDomain },
        address: { label: 'Address', name: 'address', value: lead.address },
        cityId: { label: 'City', name: 'cityId', value: lead.cityId },
        stateId: { label: 'State', name: 'stateId', value: lead.stateId },
        countryId: { label: 'Country', name: 'countryId', value: lead.countryId },
        phone: { label: 'Phone', name: 'phone', value: lead.phone },
        email: { label: 'Email', name: 'email', value: lead.email },
        website: { label: 'Website', name: 'website', value: lead.website },
        sponsoredAd: { label: 'Sponsored', name: 'sponsoredAd', value: lead.sponsoredAd }
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
    .addCase(resetHomePageDraftLeadIdAction, (state) => {
      state.draftLeadId = '';
    })
    .addCase(setHomePageBusinessIdsAction, (state, action: PayloadAction<{ businessIds: string[]; draftLeadBusinessIds: string[] }>) => {
      const { businessIds, draftLeadBusinessIds } = action.payload;
      const mergedBusinessIds: string[] = [...businessIds, ...(!state.removeSavedBusinesses && draftLeadBusinessIds.length > 0 ? draftLeadBusinessIds : [])];
      state.businessIds = mergedBusinessIds;
    })
    .addCase(resetHomePageBusinessIdsAction, (state) => {
      state.businessIds = [];
    })
    .addCase(setHomePageRemoveSavedBusinessAction, (state, action: PayloadAction<boolean>) => {
      state.removeSavedBusinesses = action.payload;
    })
    .addCase(resetHomePageAction, (state) => {
      state.filters = initialValue;
      state.page = 1;
      state.pageLimit = 10;
      state.draftLeadId = '';
      state.businessIds = [];
      state.isLoading = false;
    });
});

export default leadPageReducer;
