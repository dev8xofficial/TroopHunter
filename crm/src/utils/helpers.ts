import { type ILeadAttributes } from 'validator/interfaces';

import { type IFilterOptionAttributes, type IFilterAttributes } from '../store/reducers/homePageReducer';

export const classNames = (...classes: Array<string | undefined | null>): string => {
  return classes.filter(Boolean).join(' ');
};

// Function to compare filters and lead properties
export const compareFiltersAndLead = (filters: IFilterAttributes, lead: ILeadAttributes): boolean => {
  // Create a new object to hold the filtered properties from the filters object
  const filteredProperties: Record<string, string | boolean | undefined> = {};

  // Extract the relevant properties from filters object
  Object.entries(filters).forEach(([_, filter]) => {
    const typedFilter = filter as IFilterOptionAttributes;
    filteredProperties[typedFilter.name] = typedFilter.value;
  });

  // Perform comparisons
  if (filteredProperties.name === lead.search && filteredProperties.businessDomain === lead.businessDomain && filteredProperties.address === lead.address && filteredProperties.cityId === lead.cityId && filteredProperties.stateId === lead.stateId && filteredProperties.countryId === lead.countryId && filteredProperties.phone === lead.phone && filteredProperties.email === lead.email && filteredProperties.website === lead.website && filteredProperties.sponsoredAd === lead.sponsoredAd) {
    return true;
  }

  return false;
};

export const isFiltersChanged = (filters: IFilterAttributes, initialValues: IFilterAttributes): boolean => {
  if (JSON.stringify(filters) === JSON.stringify(initialValues)) return false;

  return true;
};

export const removeEmptyStringValues = <T extends Record<string, string | boolean | number | string[]>>(obj: T): T => {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== '') {
      newObj[key] = obj[key];
    }
  }
  return newObj as T;
};
