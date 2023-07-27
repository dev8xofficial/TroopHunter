import { useState } from 'react';
import { TrashIcon as TrashIconSolid, DocumentTextIcon as DocumentTextIconSolid } from '@heroicons/react/20/solid';
import { TrashIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Button from '../../Inputs/Button/Button';
import IconButton from '../../Inputs/IconButton/IconButton';
import { IActionBarProps } from './ActionBar.interfaces';
import Avatar from '../../DataDisplay/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { IUser } from '../../../types/user';
import ListsDialog from '../../Feedback/ListsDialog/ListsDialog';
import Progress from '../../Feedback/Progress/Progress';

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    leads: 250,
    updatedAt: '4/4/2022',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
];

const ActionBar: React.FC<IActionBarProps> = ({ title = 'lead', isLoading = false }: IActionBarProps): JSX.Element => {
  const selectedLeadIds = useSelector((state: any) => state.lists.selectedLeadIds);
  const userId: string = useSelector((state: any) => state.auth.userId);
  const user: IUser = useSelector((state: any) => state.users.data[userId]);
  let [isOpenDeleteListsModal, setIsOpenDeleteListsModal] = useState(false);
  return (
    <>
      {/* Action tab */}
      <div className="sticky top-0 z-10 h-fit bg-white">
        <div className="flex h-16 items-center justify-between border-b shadow">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">{title} results</h2>
              </div>
              <div className="flex items-center text-sm">
                {title.toLowerCase() === 'lead' && (
                  <>
                    <div>
                      <span className="hidden xl:inline-block"></span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="indigo" ringOffset="white">
                          <>
                            <DocumentTextIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                            <DocumentTextIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                    <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>
                    <div>
                      <span className="hidden xl:inline-block">
                        <Button variant="outlined" color="red">
                          Delete
                        </Button>
                      </span>
                      <span className="xl:flex">
                        <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                          <>
                            <TrashIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                            <TrashIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
                          </>
                        </IconButton>
                      </span>
                    </div>
                  </>
                )}
                {title.toLowerCase() === 'lists' && (
                  <>
                    <div className="flex items-center">
                      <div className="hidden -space-x-0.5 sm:flex">
                        {people.map((person: any, index: number) => (
                          <span key={index}>
                            <Avatar image={person.imageUrl} firstName={person.name} size="xsmall" border="border border-gray-900" className="bg-gray-50 ring-2 ring-white" />
                          </span>
                        ))}
                      </div>
                      <span className="ml-3 capitalize text-indigo-600">my saved leads({user.Leads?.length})</span>
                    </div>
                    {selectedLeadIds.length > 0 && (
                      <>
                        <div className="mx-6 my-0 flex h-auto flex-col items-center self-stretch whitespace-nowrap border-r"></div>{' '}
                        <div>
                          <span className="hidden xl:inline-block">
                            <Button variant="outlined" color="red" onClick={() => setIsOpenDeleteListsModal(!isOpenDeleteListsModal)}>
                              Delete
                            </Button>
                            <ListsDialog isOpen={isOpenDeleteListsModal} closeModal={() => setIsOpenDeleteListsModal(!isOpenDeleteListsModal)} />
                          </span>
                          <span className="xl:flex">
                            <IconButton className="xl:hidden" variant="contained" color="red" ringOffset="white">
                              <>
                                <TrashIcon className="h-5 w-5 group-hover:hidden group-focus:hidden xl:hidden" aria-hidden="true" />
                                <TrashIconSolid className="hidden h-5 w-5 max-xl:group-hover:inline-block max-xl:group-focus:inline-block xl:hidden" aria-hidden="true" />
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
