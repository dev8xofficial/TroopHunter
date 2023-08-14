import React from 'react';

import { Disclosure, Transition, Switch } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';

import { type IAccordionProps } from './Accordion.interfaces';
import { classNames } from '../../../utils/helpers';
import _Combobox from '../../Inputs/Combobox/Combobox';
import TextField from '../../Inputs/TextField/TextField';

const Accordion: React.FC<IAccordionProps> = ({ label, name, value, handleChange }: IAccordionProps): JSX.Element => {
  const getField = (name: string): JSX.Element => {
    if (name === 'cityId')
      return (
        <>
          <_Combobox type="city" value={value} onChange={handleChange} />
        </>
      );
    if (name === 'stateId')
      return (
        <>
          <_Combobox type="state" value={value} onChange={handleChange} />
        </>
      );
    if (name === 'countryId')
      return (
        <>
          <_Combobox type="country" value={value} onChange={handleChange} />
        </>
      );
    if (name === 'phone') return <TextField type="tel" name={name} value={value} onChange={handleChange} placeholder={`Search ${label.toLowerCase()}...`} />;
    if (name === 'email') return <TextField type="email" name={name} value={value} onChange={handleChange} placeholder={`Search ${label.toLowerCase()}`} />;
    if (name === 'sponsoredAd')
      return (
        <Switch.Group as="div" className="flex items-center justify-between">
          <span className="flex flex-grow flex-col">
            <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
              Business&rsquo;s Sponsored Ad
            </Switch.Label>
            <Switch.Description as="span" className="text-sm text-gray-500">
              This business has strategically placed sponsored ads on Google Maps to enhance its online presence and attract potential clients in the target market.
            </Switch.Description>
          </span>
          <Switch
            checked={JSON.parse(value) === true}
            onChange={(checked: boolean) => {
              handleChange({ target: { name: 'sponsoredAd', value: checked.toString() } } satisfies React.ChangeEvent<HTMLInputElement>);
            }}
            className={classNames(JSON.parse(value) === true ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2')}
          >
            <span className="sr-only">Use setting</span>
            <span className={classNames(JSON.parse(value) === true ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out')}>
              <span className={classNames(JSON.parse(value) === true ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                  <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={classNames(JSON.parse(value) === true ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity')} aria-hidden="true">
                <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
        </Switch.Group>
      );
    return <TextField type="text" name={name} value={value !== null ? value : ''} onChange={handleChange} placeholder={`Search ${label.toLowerCase()}...`} />;
  };

  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full justify-between px-4 py-6 text-left ${open ? 'bg-white' : ''} hover:bg-white focus:outline-none sm:px-6`}>
            <span>{label}</span>
            {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          </Disclosure.Button>
          <Transition enter="transition duration-200 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
            <Disclosure.Panel className="space-y-4 border-t border-dashed bg-white p-4 sm:px-6">
              <div>
                <span className="inline-flex items-center gap-x-0.5 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  Badge
                  <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded hover:bg-indigo-600/20">
                    <span className="sr-only">Remove</span>
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                      <path d="M4 4l6 6m0-6l-6 6" />
                    </svg>
                    <span className="absolute -inset-1" />
                  </button>
                </span>
              </div>
              <div>{getField(name)}</div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
