import React, { useState, useEffect, Fragment } from 'react';

import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { type ICountryAttributes, type IStateAttributes, type ICityAttributes, type ApiResponse } from '@repo/validator';

import { type ILocationComboboxProps, type ILocationComboboxOption } from './Combobox.interfaces';
import { getCitiesByQuery, getCityByIdService } from '../../../services/cityService';
import { getCountriesByQuery, getCountryByIdService } from '../../../services/countryService';
import { getStateByIdService, getStatesByQuery } from '../../../services/stateService';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { classNames } from '../../../utils/helpers';

export interface ICountryResponseAttributes {
  country: ICountryAttributes;
  totalPages: number;
  totalRecords: number;
}

export interface ICountriesResponseAttributes {
  countries: ICountryAttributes[];
  totalPages: number;
  totalRecords: number;
}

export interface IStateResponseAttributes {
  state: IStateAttributes;
  totalPages: number;
  totalRecords: number;
}

export interface IStatesResponseAttributes {
  states: IStateAttributes[];
  totalPages: number;
  totalRecords: number;
}

export interface ICityResponseAttributes {
  city: ICityAttributes;
  totalPages: number;
  totalRecords: number;
}

export interface ICitiesResponseAttributes {
  cities: ICityAttributes[];
  totalPages: number;
  totalRecords: number;
}

const LocationCombobox: React.FC<ILocationComboboxProps> = ({ label, type, value, onChange }: ILocationComboboxProps): JSX.Element => {
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  const accessToken: string = auth.accessToken;

  const initalValue: ILocationComboboxOption = { id: '', name: '', value: '', code: '' };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ILocationComboboxOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ILocationComboboxOption>(initalValue);

  const handleOptionChange = (selectedOption: ILocationComboboxOption): void => {
    setSelectedOption(selectedOption);
    // onChange({ target: { id: selectedOption.id, name: type + 'Id', value: selectedOption?.value ? selectedOption?.value : '' } } as React.ChangeEvent<HTMLInputElement>);
    onChange(type + 'Id', selectedOption !== null ? selectedOption?.value : '');
  };

  const handleDisplayValue = (selectedOption: ILocationComboboxOption): string => {
    return selectedOption?.name !== undefined ? selectedOption.name : '';
  };

  const handleSearchQuery = (query: string): void => {
    setSearchTerm(query);
  };

  const mapCountryData = (country: ICountryAttributes): ILocationComboboxOption => {
    return {
      id: country.id,
      name: country.name,
      value: country.id,
      code: country.code
    };
  };

  const mapStateData = (state: IStateAttributes): ILocationComboboxOption => {
    return {
      id: state.id,
      name: state.name,
      value: state.id,
      code: state.countryCode
    };
  };

  const mapCityData = (city: ICityAttributes): ILocationComboboxOption => {
    return {
      id: city.id,
      name: city.name,
      value: city.id,
      code: city.stateCode
    };
  };

  useEffect(() => {
    const fetchLocationById = async (id: string): Promise<void> => {
      try {
        const countryResponse: ApiResponse<ICountryResponseAttributes> = await getCountryByIdService(id, accessToken);
        const countryData: ICountryResponseAttributes | undefined = countryResponse.data;
        const stateResponse: ApiResponse<IStateResponseAttributes> = await getStateByIdService(id, accessToken);
        const stateData: IStateResponseAttributes | undefined = stateResponse.data;
        const cityResponse: ApiResponse<ICityResponseAttributes> = await getCityByIdService(id, accessToken);
        const cityData: ICityResponseAttributes | undefined = cityResponse.data;
        let locationData: ILocationComboboxOption;

        switch (type) {
          case 'country':
            if (countryResponse.success && countryData?.country !== undefined) locationData = mapCountryData(countryData?.country);
            else locationData = initalValue;

            setSearchResults([locationData]);
            setSelectedOption(locationData);
            break;
          case 'state':
            if (stateResponse.success && stateData?.state !== undefined) locationData = mapStateData(stateData?.state);
            else locationData = initalValue;

            setSearchResults([locationData]);
            setSelectedOption(locationData);
            break;
          case 'city':
            if (cityResponse.success && cityData?.city !== undefined) locationData = mapCityData(cityData.city);
            else locationData = initalValue;

            setSearchResults([locationData]);
            setSelectedOption(locationData);
            break;
          default:
            throw new Error('Invalid location type');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (value.length > 0 && selectedOption !== null && selectedOption !== undefined && value !== selectedOption.id) {
      void fetchLocationById(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, type, accessToken]);

  useEffect(() => {
    const fetchLocationsByQuery = async (query: string): Promise<void> => {
      try {
        const countryResponse: ApiResponse<ICountriesResponseAttributes> = await getCountriesByQuery({ name: query, page: 1, limit: 10 }, accessToken);
        const countriesData: ICountriesResponseAttributes | undefined = countryResponse.data;
        const stateResponse: ApiResponse<IStatesResponseAttributes> = await getStatesByQuery({ name: query, page: 1, limit: 10 }, accessToken);
        const statesData: IStatesResponseAttributes | undefined = stateResponse.data;
        const cityResponse: ApiResponse<ICitiesResponseAttributes> = await getCitiesByQuery({ name: query, page: 1, limit: 10 }, accessToken);
        const citiesData: ICitiesResponseAttributes | undefined = cityResponse.data;
        let mappedLocations: ILocationComboboxOption[] | undefined = [];

        switch (type) {
          case 'country':
            if (countryResponse.success) mappedLocations = countriesData?.countries?.map(mapCountryData);
            else mappedLocations = [];
            setSearchResults(mappedLocations ?? []);
            break;
          case 'state':
            if (stateResponse.success) mappedLocations = statesData?.states.map(mapStateData);
            else mappedLocations = [];
            setSearchResults(mappedLocations ?? []);
            break;
          case 'city':
            if (cityResponse.success) mappedLocations = citiesData?.cities.map(mapCityData);
            else mappedLocations = [];
            setSearchResults(mappedLocations ?? []);
            break;
          default:
            throw new Error('Invalid location type');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    if (searchTerm !== '') {
      const typingTimeout = setTimeout(() => {
        void fetchLocationsByQuery(searchTerm);
      }, 500);

      return () => {
        clearTimeout(typingTimeout);
      };
    }
  }, [searchTerm, type, accessToken]);

  useEffect(() => {
    if (value === '') {
      setSearchTerm('');
      setSearchResults([]);
      setSelectedOption(initalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onChange]);

  return (
    <Combobox as="div" value={selectedOption} onChange={handleOptionChange} nullable>
      {(label ?? '').length > 0 && <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>}
      <div className={classNames(label != null ? 'mt-2' : '', 'relative')}>
        <Combobox.Input
          onChange={(event) => {
            handleSearchQuery(event.target.value);
          }}
          displayValue={(option: ILocationComboboxOption) => handleDisplayValue(option)}
          className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow outline-none transition duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm sm:leading-6 dark:border-charcoal-700 dark:bg-charcoal-200 dark:text-white dark:focus:ring-offset-charcoal-700"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => {
            setSearchTerm('');
          }}
        >
          <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-charcoal-200">
            {searchResults.length === 0 && searchTerm !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>
            ) : (
              searchResults.map((option) => (
                <Combobox.Option key={option.id} value={option} className={({ active }) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white')}>
                  {({ active, selected }) => (
                    <>
                      <div className="flex">
                        <span className={classNames('truncate', selected ? 'font-semibold' : '')}>{option.name}</span>
                        <span className={classNames('ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500 dark:text-secondary-text')}>{option.code}</span>
                      </div>

                      {selected && (
                        <span className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default LocationCombobox;
