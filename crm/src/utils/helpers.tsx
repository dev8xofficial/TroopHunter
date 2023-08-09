import { IFilterAttributes } from '../store/reducers/homePageReducer';
import { ILeadResponseAttributes } from 'common/interfaces/Lead';

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

// Function to compare filters and lead properties
export const compareFiltersAndLead = (filters: IFilterAttributes, lead: ILeadResponseAttributes): boolean => {
  // Create a new object to hold the filtered properties from the filters object
  const filteredProperties: any = {};

  // Extract the relevant properties from filters object
  Object.entries(filters).map(([_, filter]) => {
    filteredProperties[filter.name] = filter.value;
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

export const removeNullValues = <T extends Record<string, any>>(obj: T): T => {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj as T;
};
