import React, { type ReactNode } from 'react';

// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { BellIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// import Avatar from '../components/DataDisplay/Avatar/Avatar';
// import BottomNavigation from '../components/Navigation/BottomNavigation/BottomNavigation';
import BottomNavigationBlur from '../components/Navigation/BottomNavigation/BottomNavigationBlur';
import { authSignOutAction } from '../store/actions/authActions';
// import { resetNavigationAction } from '../store/actions/navigationActions';
import { type IAuthState } from '../store/reducers/authReducer';
// import { type INavigationState } from '../store/reducers/navigationReducer';
// import { classNames } from '../utils/helpers';

// const user = {
//   firstName: 'Tom',
//   lastName: 'Cook',
//   email: 'tom@example.com',
//   imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
// };

// const navigation = [
//   { name: 'Home', href: '/lead', current: true },
//   { name: 'Leads', href: '/leads', current: false }
// ];

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }: DefaultLayoutProps): JSX.Element => {
  // Use the useLocation hook to get the current URL pathname
  const dispatch = useDispatch();
  const router = useRouter();
  // const location = useLocation();

  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  // Update the navigation array based on the current URL
  // const updatedNavigation = navigation.map((item) => ({
  //   ...item,
  //   current: item.href === location.pathname
  // }));

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Desktop navigation */}
        {/* <Disclosure as="nav" className="hidden border-b border-gray-700 bg-gray-800 xl:block dark:bg-charcoal-700">
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-6 lg:h-8" src="/logo/logo.svg" alt="TroopHunter" />
                  </div>
                </div>
                <div>
                  <div className="ml-20 flex items-baseline space-x-4">
                    {updatedNavigation.map((item) => (
                      <Link key={item.name} to={item.href} className={classNames(item.current ? 'text-white' : 'text-gray-400 hover:text-white', 'px-3 py-2 text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="ml-4 flex items-center md:ml-6">
                    <button type="button" className="rounded-full bg-red-800 p-1 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className={`flex items-center justify-center rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}>
                          <span className="sr-only">Open user menu</span>
                          <Avatar image={user.imageUrl} firstName={user.firstName} size="small" border="border" />
                        </Menu.Button>
                      </div>
                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-charcoal-300">
                          <Menu.Item key="Home">
                            {({ active }) => (
                              <Link to="/settings/profile" className={classNames(active ? 'bg-gray-100 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-500 dark:hover:text-primary-text' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-primary-text')}>
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item key="Leads">
                            {({ active }) => (
                              <Link
                                to="#"
                                onClick={() => {
                                  dispatch(authSignOutAction({ id: auth.userId, navigate }));
                                }}
                                className={classNames(active ? 'bg-gray-100 dark:bg-charcoal-300 dark:text-white dark:hover:bg-charcoal-500 dark:hover:text-primary-text' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-primary-text')}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Disclosure> */}

        <BottomNavigationBlur
          signOut={() => {
            dispatch(authSignOutAction({ id: auth.userId, navigate: router.push }));
          }}
        />

        {/* Content */}
        <main className="flex flex-1 flex-col dark:bg-charcoal-300">{children}</main>
      </div>
    </>
  );
};

export default DefaultLayout;
