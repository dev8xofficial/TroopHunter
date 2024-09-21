import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import { authRegisterAction } from '../store/actions/authActions';
import { type ISignUpFormValues } from '../types/formik';

const _SignUp: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: ISignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        authRegisterAction({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          navigate
        })
      );
    }
  });

  return (
    <>
      <Helmet>
        <title>Sign Up - TroopHunter</title>
        <meta name="description" content="Sign up for TroopHunter to start finding the right clients and grow your business." />
        <link rel="canonical" href={`${import.meta.env.VITE_TROOPHUNTER_APP_URL}/signup`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Sign Up - TroopHunter" />
        <meta property="og:description" content="Sign up for TroopHunter to start finding the right clients and grow your business." />
        <meta property="og:url" content={`${import.meta.env.VITE_TROOPHUNTER_APP_URL}/signup`} />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`} />
        <meta property="og:image:secure_url" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`}></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up - TroopHunter" />
        <meta name="twitter:description" content="Sign up for TroopHunter to start finding the right clients and grow your business." />
        <meta name="twitter:image" content={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo-social.png`} />
        <meta name="twitter:site" content="@TroopHunter" />
      </Helmet>

      <div>
        <img className="h-8" src={`${import.meta.env.VITE_TROOPHUNTER_PUBLIC_URL}/logo.svg`} alt="TroopHunter" />
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Already a member?{' '}
          <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div>
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={formik.handleSubmit} className="space-y-2 xl:space-y-6">
              <TextField label="First Name" type="text" name="firstName" value={formik.values?.firstName} onChange={formik.handleChange} required />

              <TextField label="Last Name" type="text" name="lastName" value={formik.values?.lastName} onChange={formik.handleChange} required />

              <TextField label="Email address" type="email" name="email" value={formik.values?.email} onChange={formik.handleChange} required />

              <TextField label="Password" type="password" name="password" value={formik.values?.password} onChange={formik.handleChange} required />

              {/* <div className="flex items-center justify-end">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
              </div> */}

              <div className="pt-6">
                <Button type="submit" variant="contained" color="indigo" className="w-full" disabled={!formik.dirty}>
                  Register
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </div>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-600 dark:border-charcoal-100" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-4 uppercase text-gray-600 dark:bg-charcoal-300 dark:text-gray-100">or</span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4 xl:mt-6">
            <a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent dark:bg-transparent dark:text-white dark:ring-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white">
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span className="text-sm font-semibold leading-6">Twitter</span>
            </a>

            <a href="#" className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent dark:bg-transparent dark:text-white dark:ring-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white">
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default _SignUp;
