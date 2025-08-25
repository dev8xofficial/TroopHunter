import React from 'react';

import { type IUserAttributes } from '@repo/validator';
import { Form, FormikProvider, useFormik } from 'formik';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Inputs/Button/Button';
import TextField from '../../../components/Inputs/TextField/TextField';
import DefaultLayout from '../../../layout/DefaultLayout';
import SettingsLayout from '../../../layout/SettingsLayout';
import withAuth from '../../../middleware/withAuth';
import { updateUserPasswordAction } from '../../../store/actions/userActions';
import { type IAuthState } from '../../../store/reducers/authReducer';
import { type IUserState } from '../../../store/reducers/userReducer';
import type { NextPageWithLayout } from '../../_app';

export interface IUserFormValues {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const SettingsSecurity: NextPageWithLayout = (): JSX.Element => {
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
      <Head>
        <title>Security Settings - TroopHunter</title>
        <meta name="description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <link rel="canonical" href="/settings/security" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Security Settings - TroopHunter" />
        <meta property="og:description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <meta property="og:url" content="/settings/security" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo/logo-social.png" />
        <meta property="og:image:secure_url" content="/logo/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Security Settings - TroopHunter" />
        <meta name="twitter:description" content="Manage your security settings on TroopHunter to protect your account and data." />
        <meta name="twitter:image" content="/logo/logo-social.png" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>

      <dl className="space-y-6 divide-y divide-gray-100 text-sm leading-6 lg:mt-6 lg:border-t lg:border-gray-200 dark:border-charcoal-100">
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="pt-8 sm:flex lg:pt-6">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 dark:text-primary-text">Old Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full sm:w-auto">
                  <TextField type="password" name="password" value={formik.values?.password} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="sm:flex xl:pt-6">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 dark:text-primary-text">New Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full sm:w-auto">
                  <TextField type="password" name="newPassword" value={formik.values?.newPassword} onChange={formik.handleChange} required />
                </div>
              </dd>
            </div>
            <div className="sm:flex xl:pt-6">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 dark:text-primary-text">Confirm Password</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="w-full sm:w-auto">
                  <TextField type="password" name="confirmPassword" value={formik.values?.confirmPassword} onChange={formik.handleChange} required />
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

SettingsSecurity.getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default withAuth(SettingsSecurity);
