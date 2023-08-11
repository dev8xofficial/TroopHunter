import { Fragment } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { AdjustmentsVerticalIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Transition, Dialog } from '@headlessui/react';
import { CustomDialogAttributes } from './LeadSaveDialog.interfaces';
import TextField from '../../Inputs/TextField/TextField';
import Button from '../../Inputs/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IFilterAttributes, IHomePageState } from '../../../store/reducers/homePageReducer';
import { createLeadAction, updateLeadAction } from '../../../store/actions/leadActions';
import { toast } from 'react-toastify';
import { IUserAttributes } from 'validator/interfaces';
import { ILeadAttributes } from 'validator/interfaces';
import { IAuthState } from '../../../store/reducers/authReducer';
import { IBusinessState } from '../../../store/reducers/businessReducer';
import { IUserState } from '../../../store/reducers/userReducer';

const LeadSaveDialog: React.FC<CustomDialogAttributes> = ({ isOpen, closeModal }: CustomDialogAttributes): JSX.Element => {
  const dispatch = useDispatch();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const home = useSelector((state: { home: IHomePageState }) => state.home);
  const users = useSelector((state: { users: IUserState }) => state.users);
  const businesses = useSelector((state: { businesses: IBusinessState }) => state.businesses);

  const leadPageFilters: IFilterAttributes = home.filters;
  const leadPageDraftLeadId: string = home.draftLeadId;
  const leadPageBusinessIds: string[] = home.businessIds;
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];
  const businessesTotalRecords: number = businesses.data.totalRecords;

  const draftLead = usersLoggedIn?.Leads?.find((lead: ILeadAttributes) => lead.id === leadPageDraftLeadId);

  interface ILeadFormmValues {
    title: string;
  }

  const initialValues: ILeadFormmValues = {
    title: draftLead?.title ? draftLead?.title : '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const { title } = values;
      if (Object.keys(leadPageFilters).length > 0 && Object.values(leadPageFilters).some((item) => item.name !== 'sponsoredAd' && item.value !== '')) {
        const requestData = {
          id: leadPageDraftLeadId,
          token: auth.token,
          userId: auth.userId,
          businessCount: Array.isArray(leadPageBusinessIds) && leadPageBusinessIds.length > 0 ? leadPageBusinessIds.length : businessesTotalRecords ? businessesTotalRecords : 0,
          businessIds: leadPageBusinessIds,
          title,
          search: leadPageFilters['name'].value,
          businessDomain: leadPageFilters['businessDomain'].value,
          address: leadPageFilters['address'].value,
          cityId: leadPageFilters['cityId'].value,
          stateId: leadPageFilters['stateId'].value,
          countryId: leadPageFilters['countryId'].value,
          phone: leadPageFilters['phone'].value,
          email: leadPageFilters['email'].value,
          website: leadPageFilters['website'].value,
          sponsoredAd: leadPageFilters['sponsoredAd'].value,
        };

        if (leadPageDraftLeadId) dispatch(updateLeadAction(requestData));
        else dispatch(createLeadAction(requestData));

        resetForm();
        closeModal();
      } else {
        toast.info('You have searched nothing.');
      }
    },
  });
  return (
    <>
      {/* Advanced search filters */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-xl transform divide-y overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="bg-gray-800 px-6 py-4 text-lg font-medium leading-6 text-white">
                    <div className="flex items-center justify-between">
                      <AdjustmentsVerticalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg leading-7 sm:truncate sm:text-xl sm:tracking-tight">Lead Title</h2>
                        <p className="text-sm sm:hidden">0 results</p>
                      </div>
                      <div className="flex items-center space-x-3 md:ml-4">
                        <button onClick={closeModal} type="button" className="rounded-full p-2 shadow-sm hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>
                  <div className="p-6">
                    <div className="space-y-8">
                      <FormikProvider value={formik}>
                        <Form noValidate onSubmit={formik.handleSubmit} className="space-y-6">
                          <TextField label="Enter Title for Lead Information" type="text" name="title" value={formik.values && formik.values.title} helperText={formik.errors && formik.errors.title} onChange={formik.handleChange} required />

                          <Button type="submit" variant="contained" color="indigo" className="w-full">
                            Save
                          </Button>
                        </Form>
                      </FormikProvider>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LeadSaveDialog;
