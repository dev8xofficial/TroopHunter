import { Disclosure, Transition } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { IAccordionBusinessDomainProps } from './AccordionBusinessDomain.interfaces';
import TextField from '../../../Inputs/TextField/TextField';

const AccordionBusinessDomain: React.FC<IAccordionBusinessDomainProps> = ({ label, name, value, handleChange }: IAccordionBusinessDomainProps): JSX.Element => {
  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full justify-between px-4 py-6 text-left ${open && 'bg-white'} hover:bg-white focus:outline-none sm:px-6`}>
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
              <div>
                <TextField type="text" name={name} value={value} onChange={handleChange} placeholder={`Search ${label.toLowerCase()}...`} />
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default AccordionBusinessDomain;
