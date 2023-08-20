import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { type IUserAttributes } from 'validator';

import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import SettingsLayout from '../layout/SettingsLayout';
import { updateUserPasswordAction } from '../store/actions/userActions';
import { type IAuthState } from '../store/reducers/authReducer';
import { type IUserState } from '../store/reducers/userReducer';

export interface IUserFormValues {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsSecurity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const auth = useSelector((state: { auth: IAuthState }) => state.auth);
  const users = useSelector((state: { users: IUserState }) => state.users);
  const usersLoggedIn: IUserAttributes = users.data[auth.userId];

  const initialValues: IUserFormValues = {
    password: usersLoggedIn.password ?? '',
    newPassword: '',
    confirmPassword: ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        updateUserPasswordAction({
          userId: usersLoggedIn.id,
          password: values.password,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        })
      );
    }
  });

  return (
    <SettingsLayout>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Old Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full max-w-xs">
                  <TextField type="password" name="password" value={formik.values?.password} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">New Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full max-w-xs">
                  <TextField type="password" name="newPassword" value={formik.values?.newPassword} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Confirm Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full max-w-xs">
                  <TextField type="password" name="confirmPassword" value={formik.values?.confirmPassword} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <Button type="submit" variant="contained" color="indigo" disabled={!formik.dirty}>
                Update
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </dl>
    </SettingsLayout>
  );
};

export default SettingsSecurity;
