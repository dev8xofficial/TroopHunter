import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox, Transition } from '@headlessui/react';
import { classNames } from '../../../utils/helpers';
import { ILocationComboboxProps, ILocationComboboxOption } from './Combobox.interfaces';
import { getCountriesByQuery, getCountryByIdService } from '../../../services/countryService';
import { getStateByIdService, getStatesByQuery } from '../../../services/stateService';
import { getCitiesByQuery, getCityByIdService } from '../../../services/cityService';
import { IAuthState } from '../../../store/reducers/authReducer';
import { ICountryResponseAttributes } from 'common/interfaces/Country';
import { IStateResponseAttributes } from 'common/interfaces/State';
import { ICityResponseAttributes } from 'common/interfaces/City';

const LocationCombobox: React.FC<ILocationComboboxProps> = ({ label, type, value, onChange }: ILocationComboboxProps): JSX.Element => {
  const { auth }: { auth: IAuthState } = useSelector((state: { auth: IAuthState }) => state);

  const token: string = auth.token;

  const initalValue: ILocationComboboxOption = { id: '', name: '', value: '', code: '' };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ILocationComboboxOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<ILocationComboboxOption>(initalValue);

  const handleOptionChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    onChange({ target: { id: selectedOption.id, name: type + 'Id', value: selectedOption?.value ? selectedOption?.value : '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDisplayValue = (selectedOption: any) => {
    return selectedOption?.name ? selectedOption?.name : '';
  };

  const handleSearchQuery = async (query: string) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    const fetchLocationById = async (id: string) => {
      try {
        let response: any;
        let locationData: ILocationComboboxOption;

        switch (type) {
          case 'country':
            response = await getCountryByIdService(id, token);
            if (response.success) locationData = mapCountryData(response.data);
            else locationData = initalValue;
            break;
          case 'state':
            response = await getStateByIdService(id, token);
            if (response.success) locationData = mapStateData(response.data);
            else locationData = initalValue;
            break;
          case 'city':
            response = await getCityByIdService(id, token);
            if (response.success) locationData = mapCityData(response.data);
            else locationData = initalValue;
            break;
          default:
            throw new Error('Invalid location type');
        }

        setSearchResults([locationData]);
        setSelectedOption(locationData);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (value && selectedOption && value !== selectedOption.id) {
      fetchLocationById(value);
    }
  }, [value, type, token]);

  useEffect(() => {
    const fetchLocationsByQuery = async (query: string) => {
      try {
        let response: any;
        let mappedLocations: ILocationComboboxOption[];

        switch (type) {
          case 'country':
            response = await getCountriesByQuery({ name: query, page: 1, limit: 10 }, token);
            if (response.success) mappedLocations = response.data.countries.map(mapStateData);
            else mappedLocations = [];
            break;
          case 'state':
            response = await getStatesByQuery({ name: query, page: 1, limit: 10 }, token);
            if (response.success) mappedLocations = response.data.states.map(mapStateData);
            else mappedLocations = [];
            break;
          case 'city':
            response = await getCitiesByQuery({ name: query, page: 1, limit: 10 }, token);
            if (response.success) mappedLocations = response.data.cities.map(mapCityData);
            else mappedLocations = [];
            break;
          default:
            throw new Error('Invalid location type');
        }

        setSearchResults(mappedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    if (searchTerm !== '') {
      const typingTimeout = setTimeout(() => {
        fetchLocationsByQuery(searchTerm);
      }, 500);

      return () => clearTimeout(typingTimeout);
    }
  }, [searchTerm, type, token]);

  useEffect(() => {
    if (value === '') {
      setSearchTerm('');
      setSearchResults([]);
      setSelectedOption(initalValue);
    }
  }, [value, onChange]);

  const mapCountryData = (country: ICountryResponseAttributes): ILocationComboboxOption => {
    return {
      id: country.id,
      name: country.name,
      value: country.id,
      code: country.code,
    };
  };

  const mapStateData = (state: IStateResponseAttributes): ILocationComboboxOption => {
    return {
      id: state.id,
      name: state.name,
      value: state.id,
      code: state.countryCode,
    };
  };

  const mapCityData = (city: ICityResponseAttributes): ILocationComboboxOption => {
    return {
      id: city.id,
      name: city.name,
      value: city.id,
      code: city.stateCode,
    };
  };

  return (
    <Combobox as="div" value={selectedOption} onChange={handleOptionChange} nullable>
      {label && <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>}
      <div className={classNames(label && 'mt-2', 'relative')}>
        <Combobox.Input onChange={(event) => handleSearchQuery(event.target.value)} displayValue={(option) => handleDisplayValue(option)} className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow outline-none transition duration-200 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-white sm:text-sm sm:leading-6" />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setSearchTerm('')}>
          <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchResults.length === 0 && searchTerm !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>
            ) : (
              searchResults.map((option) => (
                <Combobox.Option key={option.id} value={option} className={({ active }) => classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')}>
                  {({ active, selected }) => (
                    <>
                      <div className="flex">
                        <span className={classNames('truncate', selected && 'font-semibold')}>{option.name}</span>
                        <span className={classNames('ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500')}>{option.code}</span>
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
