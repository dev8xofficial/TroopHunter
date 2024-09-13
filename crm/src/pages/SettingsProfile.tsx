import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { type IUserAttributes } from 'validator';

import Avatar from '../components/DataDisplay/Avatar/Avatar';
import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import SettingsLayout from '../layout/SettingsLayout';
import { updateUserNameAction } from '../store/actions/userActions';
import { type IAuthState } from '../store/reducers/authReducer';
import { type IUserState } from '../store/reducers/userReducer';

export interface IUserFormValues {
  firstName: string;
  lastName: string;
}

const SettingsProfile: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];

  const initialValues: IUserFormValues = {
    firstName: usersLoggedIn.firstName ?? '',
    lastName: usersLoggedIn.lastName ?? ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        updateUserNameAction({
          userId: usersLoggedIn.id,
          firstName: values.firstName,
          lastName: values.lastName
        })
      );
    }
  });

  return (
    <SettingsLayout>
      <dl className="space-y-6 divide-y divide-gray-100 text-sm leading-6 lg:mt-6 lg:border-t lg:border-gray-200 dark:border-charcoal-100">
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="pt-8 sm:flex lg:pt-6">
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div>
                  <div className="col-span-full flex items-center gap-x-8">
                    <Avatar firstName="Toom" size="xlarge" border="border border-gray-900" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <div>
                      <Button variant="outlined" color="indigo">
                        Change avatar
                      </Button>
                      <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="sm:flex xl:pt-6">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 dark:text-primary-text">First Name</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full sm:w-auto">
                  <TextField type="text" name="firstName" value={formik.values?.firstName} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="sm:flex xl:pt-6">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 dark:text-primary-text">Last Name</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full sm:w-auto">
                  <TextField type="text" name="lastName" value={formik.values?.lastName} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="pt-2 sm:flex sm:pt-0 xl:pt-6">
              <Button type="submit" variant="contained" color="indigo" disabled={!formik.dirty} className="w-full sm:w-auto">
                Update
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </dl>
    </SettingsLayout>
  );
};

export default SettingsProfile;
