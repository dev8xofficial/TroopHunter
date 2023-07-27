import { useState } from 'react';
import { FingerPrintIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Avatar from '../components/DataDisplay/Avatar/Avatar';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Lists = () => {
  const [secondaryNavigation, setSecondaryNavigation] = useState([
    { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  ]);

  const handleSecondaryNavigation = (active: any) => {
    let array: any = secondaryNavigation;
    array.map((nav: any) => {
      if (nav.name === active.name) {
        nav.current = true;
      } else {
        nav.current = false;
      }
    });
    setSecondaryNavigation(array);
  };

  return (
    <>
      {/* Content */}
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-x-16">
          <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
              <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <button onClick={() => handleSecondaryNavigation(item)} className={classNames(item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex w-full gap-x-3 rounded py-2 pl-2 pr-3 text-sm font-semibold leading-6')}>
                      <item.icon className={classNames(item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0')} aria-hidden="true" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              {secondaryNavigation.map((item) =>
                item.name === 'Profile' && item.current ? (
                  <>
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>

                      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div>
                              <div className="col-span-full flex items-center gap-x-8">
                                <Avatar firstName="Toom" size="xlarge" border="border border-gray-900" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                <div>
                                  <button type="button" className="rounded border border-indigo-600 bg-white/10 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white">
                                    Change avatar
                                  </button>
                                  <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                              </div>
                            </div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-600">
                              Update
                            </button>
                          </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First Name</dt>
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div>
                              <div>
                                <input type="firstName" name="firstName" id="firstName" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Toom" />
                              </div>
                            </div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-600">
                              Update
                            </button>
                          </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last Name</dt>
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div>
                              <div>
                                <input type="lastName" name="lastName" id="lastName" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Cook" />
                              </div>
                            </div>
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-600">
                              Update
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </>
                ) : item.name === 'Security' && item.current ? (
                  <>
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Password</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-500">This information will be applied quickly.</p>

                      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Old Password</dt>
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="w-full max-w-xs">
                              <input type="oldPassword" name="oldPassword" id="oldPassword" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                          </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">New Password</dt>
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="w-full max-w-xs">
                              <input type="newPassword" name="newPassword" id="newPassword" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                          </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Confirm Password</dt>
                          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="w-full max-w-xs">
                              <input type="confirmPassword" name="confirmPassword" id="confirmPassword" className="block w-full rounded border-0 px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                          </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                          <button type="button" className="inline-flex items-center rounded border border-indigo-600 px-3 py-2 text-sm text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white">
                            Save search
                          </button>
                        </div>
                      </dl>
                    </div>
                  </>
                ) : (
                  <></>
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Lists;
