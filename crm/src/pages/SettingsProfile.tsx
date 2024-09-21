import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { type IUserAttributes } from 'validator';

// import Avatar from '../components/DataDisplay/Avatar/Avatar';
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
      <Helmet>
        <title>Profile Settings - TroopHunter</title>
        <meta name="description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
        <link rel="canonical" href="https://www.troophunter.com/settings/profile" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Profile Settings - TroopHunter" />
        <meta property="og:description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
        <meta property="og:url" content="https://www.app.troophunter.com/settings/profile" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="https://www.troophunter.com/logo-social.png" />
        <meta property="og:image:secure_url" content="https://www.troophunter.com/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile Settings - TroopHunter" />
        <meta name="twitter:description" content="Update your profile settings on TroopHunter to keep your account information up to date." />
        <meta name="twitter:image" content="https://www.troophunter.com/logo-social.png" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Helmet>

      <dl className="space-y-6 divide-y divide-gray-100 text-sm leading-6 lg:mt-6 lg:border-t lg:border-gray-200 dark:border-charcoal-100">
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit} className="space-y-6">
            {/* <div className="pt-8 sm:flex lg:pt-6">
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
            </div> */}
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
