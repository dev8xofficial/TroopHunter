import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { Disclosure } from '@headlessui/react';
import { IAccordionProps } from './Accordion.interfaces';
import TextField from '../../Inputs/TextField/TextField';

const Accordion: React.FC<IAccordionProps> = ({ label }: IAccordionProps): JSX.Element => {
  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left hover:bg-gray-50 focus:outline-none sm:px-6">
            <span>{label}</span>
            {open ? <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-4 border-t border-dashed p-4 sm:px-6">
            <div>
              <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                Badge
                <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20">
                  <span className="sr-only">Remove</span>
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-indigo-700/50 group-hover:stroke-indigo-700/75">
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span className="absolute -inset-1" />
                </button>
              </span>
            </div>
            <div>
              <TextField type="text" name="lead" placeholder="lead" />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
