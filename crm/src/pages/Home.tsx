// import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const stats = [
  { name: 'Total Results', value: '248', changeType: 'positive' },
  { name: 'Changed jobs in past 90 days', value: '7', changeType: 'negative' },
  { name: 'Outstanding invoices', value: '76', changeType: 'positive' },
  { name: 'Expenses', value: '20', changeType: 'negative' },
];

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Lead = () => {
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.BACKEND_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the JWT token to the request
  //       },
  //     })
  //     .then((response: any) => {
  //       toast('User exits');
  //     })
  //     .catch((error: any) => {
  //       toast("User doesn't exit:");
  //     });
  // }, []);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-white">
        <body className="h-full">
        ```
      */}
      <div>
        <div className="grid grid-cols-12">
          <aside className="hidden space-y-6 overflow-y-auto border-r border-gray-200 px-4 sm:px-6 lg:px-8 xl:col-span-4 xl:block">
            <ul role="list" className="space-y-3">
              <li className="overflow-hidden bg-white px-4 py-6 shadow sm:rounded-md sm:px-6">Keywords</li>
            </ul>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                <li className="px-4 py-6 sm:px-6">Your leads & accounts</li>
                <li className="px-4 py-6 sm:px-6">Relationship</li>
                <li className="px-4 py-6 sm:px-6">Company</li>
                <li className="px-4 py-6 sm:px-6">Industry</li>
                <li className="px-4 py-6 sm:px-6">Company headcount</li>
                <li className="px-4 py-6 sm:px-6">Function</li>
              </ul>
            </div>
          </aside>
          <main className="col-span-12 w-full bg-white shadow sm:rounded-md xl:col-span-8 xl:ml-8">
            <div>
              <dl className="mx-auto grid grid-cols-1 gap-px border-b border-gray-900/5 bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-3 py-4 sm:px-4 xl:px-6">
                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{stat.value}</dd>
                    <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <ul role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                {people.map((person) => (
                  <li key={person.email} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                    <div className="flex gap-x-4">
                      <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-gray-900">
                          <a href={person.href}>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {person.name}
                          </a>
                        </p>
                        <div className="hidden sm:flex sm:flex-col">
                          <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                          {person.lastSeen ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                            </p>
                          ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              </div>
                              <p className="text-xs leading-5 text-gray-500">Online</p>
                            </div>
                          )}
                        </div>
                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                          <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                            {person.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Lead;
