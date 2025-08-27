/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../components/Inputs/Button/Button';
import TextField from '../../../../components/Inputs/TextField/TextField';
import AuthLayout from '../../../../layout/AuthLayout';
import withGuest from '../../../../middleware/withGuest';
import { authResetPasswordAction, authResetPasswordVerificationAction } from '../../../../store/actions/authActions';
import { type IAuthState } from '../../../../store/reducers/authReducer';
import { type IResetPasswordFormmValues } from '../../../../types/formik';
import type { NextPageWithLayout } from '../../../_app';

const _ResetPassword: NextPageWithLayout = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { queryId, queryToken } = router.query;
  const id = Array.isArray(queryId) ? queryId[0] : queryId;
  const token = Array.isArray(queryToken) ? queryToken[0] : queryToken;
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  const initialValues: IResetPasswordFormmValues = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (auth.isResetPasswordVerified)
        dispatch(
          authResetPasswordAction({
            id: id ?? '',
            token: token ?? '',
            password: values.password,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            navigate: async (path: string) => await router.push(path)
          })
        );
    }
  });

  useEffect(() => {
    if (token != null && id != null) {
      dispatch(
        authResetPasswordVerificationAction({
          id,
          token
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

  return (
    <>
      <Head>
        <title>Reset Password - TroopHunter</title>
        <meta name="description" content="Reset your password to access your TroopHunter account securely." />
        <link rel="canonical" href="/reset-password/:id/:token" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Reset Password - TroopHunter" />
        <meta property="og:description" content="Reset your password to access your TroopHunter account securely." />
        <meta property="og:url" content="/" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo/logo-social.png" />
        <meta property="og:image:secure_url" content="/logo/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reset Password - TroopHunter" />
        <meta name="twitter:description" content="Reset your password to access your TroopHunter account securely." />
        <meta name="twitter:image" content="/logo/logo-social.png" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>

      <div>
        <img className="h-6 lg:h-8" src="/logo/logo.svg" alt="TroopHunter" />
        {/* <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Already a member?{' '}
          <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-600">
            Sign in
          </Link>
        </p> */}
      </div>

      <div className="mt-6">
        <div>
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit} className="space-y-2 xl:space-y-6">
              <TextField label="Old Password" type="password" name="password" value={formik.values?.password} onChange={formik.handleChange} required />
              <TextField label="New Password" type="password" name="newPassword" value={formik.values?.newPassword} onChange={formik.handleChange} required />
              <TextField label="Confirm Password" type="password" name="confirmPassword" value={formik.values?.confirmPassword} onChange={formik.handleChange} required />

              <div className="pt-6">
                <Button type="submit" variant="contained" color="indigo" className="w-full" disabled={!formik.dirty}>
                  Reset
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </div>

        <div className="mt-6 flex justify-center text-sm leading-6">
          <h1 className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Already a member?{' '}
            <Link href="/signin" className="font-semibold text-indigo-500 hover:text-indigo-600">
              Sign in
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

_ResetPassword.getLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default withGuest(_ResetPassword);
