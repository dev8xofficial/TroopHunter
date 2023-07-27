import { Fragment } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { AdjustmentsVerticalIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Transition, Dialog } from '@headlessui/react';
import { CustomDialogAttributes } from './LeadDialog.interfaces';
import TextField from '../../Inputs/TextField/TextField';
import Button from '../../Inputs/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IFilterAttributes } from '../../../store/reducers/leadPageReducer';
import { createLeadAction } from '../../../store/actions/leadActions';
import { toast } from 'react-toastify';

const LeadDialog: React.FC<CustomDialogAttributes> = ({ isOpen, closeModal, submit }: CustomDialogAttributes): JSX.Element => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const leadFilters: IFilterAttributes[] = useSelector((state: any) => state.lead.leadFilters);

  const formikSchema = Yup.object().shape({
    title: Yup.string().required('Kindly Enter Title For Lead Information.'),
  });

  interface ILeadFormmValues {
    title: string;
  }

  const initialValues: ILeadFormmValues = {
    title: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: formikSchema,
    onSubmit: async (values) => {
      const { title } = values;
      if (submit) {
        if (leadFilters.length > 0 && leadFilters.some((item) => item.name !== 'sponsoredAd' && item.value !== '')) {
          const filtersObject: Record<string, string> = {};
          for (const filter of leadFilters) {
            filtersObject[filter.name] = filter.value;
          }

          const requestData = {
            token: auth.token,
            userId: auth.userId,
            title, // Spread the properties of 'title' object into 'requestData'
            search: filtersObject.name,
            ...filtersObject, // Spread the properties of 'filtersObject' object into 'requestData'
          };
          dispatch(createLeadAction(requestData));
        } else {
          toast.info('You have searched nothing.');
        }
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

export default LeadDialog;
