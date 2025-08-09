/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import Button from '../../components/Inputs/Button/Button';
import TextField from '../../components/Inputs/TextField/TextField';
import AuthLayout from '../../layout/AuthLayout';
import withGuest from '../../middleware/withGuest';
import { authForgotPasswordAction } from '../../store/actions/authActions';
import { type IForgotPasswordFormmValues } from '../../types/formik';
import type { NextPageWithLayout } from '../_app';

const _ForgotPassword: NextPageWithLayout = (): JSX.Element => {
  const dispatch = useDispatch();

  const initialValues: IForgotPasswordFormmValues = {
    email: ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        authForgotPasswordAction({
          email: values.email
        })
      );
    }
  });

  return (
    <>
      <Head>
        <title>Forgot Password - TroopHunter</title>
        <meta name="description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
        <link rel="canonical" href="/forgot-password" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Forgot Password - TroopHunter" />
        <meta property="og:description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
        <meta property="og:url" content="/forgot-password" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo/logo-social.png" />
        <meta property="og:image:secure_url" content="/logo/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Forgot Password - TroopHunter" />
        <meta name="twitter:description" content="Forgot your password? Recover it here and regain access to your TroopHunter account." />
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
              <TextField label="Email address" type="email" name="email" value={formik.values?.email} onChange={formik.handleChange} required />

              <div className="pt-6">
                <Button type="submit" variant="contained" color="indigo" className="w-full" disabled={!formik.dirty}>
                  Submit
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

_ForgotPassword.getLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default withGuest(_ForgotPassword);
