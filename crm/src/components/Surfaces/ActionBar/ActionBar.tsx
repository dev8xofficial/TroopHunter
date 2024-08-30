import React, { useState } from 'react';

import { TrashIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { type IUserAttributes } from 'validator/interfaces';

import { type IActionBarProps } from './ActionBar.interfaces';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { type ILeadsState } from '../../../store/reducers/leadsPageReducer';
import { type IUserState } from '../../../store/reducers/userReducer';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import LeadsDeletionDialog from '../../Feedback/LeadsDeletionDialog/LeadsDeletionDialog';
import Progress from '../../Feedback/Progress/Progress';
import Button from '../../Inputs/Button/Button';
import IconButton from '../../Inputs/IconButton/IconButton';

interface IPersonAttributes {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  url: string;
  profileUrl: string;
  imageUrl: string;
}

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Arham Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const ActionBar: React.FC<IActionBarProps> = ({ title = 'lead', isLoading = false }: IActionBarProps): JSX.Element => {
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);
  const leads = useSelector((state: { leads: ILeadsState }) => state.leads);

  const selectedLeadIds = leads.selectedLeadIds;
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];

  const [isOpenDeleteLeadsModal, setIsOpenDeleteLeadsModal] = useState(false);

  return (
    <>
      {/* Action tab */}
      <div className="sticky top-0 z-10 h-fit bg-white dark:bg-charcoal-500">
        <div className="flex h-16 items-center justify-between border-b shadow dark:border-charcoal-100">
          <div className="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-full items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">{title} results</h2>
              </div>
              <div className="flex h-full items-center text-sm">
                {title.toLowerCase() === 'lead' && (
                  <>
                    <div>
                      <span className="hidden xl:inline-block"></span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="indigo" ringOffset="white">
                          <>
                            <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                    <div className="mx-4 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r dark:border-r-charcoal-100"></div>
                    <div>
                      <span className="hidden xl:inline-block">
                        <Button variant="outlined" color="red">
                          Delete
                        </Button>
                      </span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                          <>
                            <TrashIcon className="h-6 w-6" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                  </>
                )}
                {title.toLowerCase() === 'leads' && (
                  <>
                    <div className="flex items-center">
                      <div className="hidden -space-x-0.5 sm:flex">
                        {people.map((person: IPersonAttributes, index: number) => (
                          <span key={index}>
                            <Avatar image={person.imageUrl} firstName={person.name} size="xsmall" border="border border-gray-900" className="bg-gray-50 ring-2 ring-white" />
                          </span>
                        ))}
                      </div>
                      <span className="ml-3 capitalize text-indigo-600">my saved leads({usersLoggedIn.Leads?.length})</span>
                    </div>
                    {selectedLeadIds.length > 0 && (
                      <>
                        <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>{' '}
                        <div>
                          <span className="hidden xl:inline-block">
                            <Button
                              variant="outlined"
                              color="red"
                              onClick={() => {
                                setIsOpenDeleteLeadsModal(!isOpenDeleteLeadsModal);
                              }}
                            >
                              Delete
                            </Button>
                            <LeadsDeletionDialog
                              isOpen={isOpenDeleteLeadsModal}
                              closeModal={() => {
                                setIsOpenDeleteLeadsModal(!isOpenDeleteLeadsModal);
                              }}
                            />
                          </span>
                          <span className="xl:flex">
                            <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                              <>
                                <TrashIcon className="h-5 w-5 xl:hidden" aria-hidden="true" />
                              </>
                            </IconButton>
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isLoading && <Progress isLoading={isLoading} />}
    </>
  );
};

export default ActionBar;
