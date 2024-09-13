import React from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import logo from '../images/logo/TroopHunter-style.svg';
import { authForgotPasswordAction } from '../store/actions/authActions';
import { type IForgotPasswordFormmValues } from '../types/formik';

const _ForgotPassword: React.FC = (): JSX.Element => {
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
      <div>
        <img className="h-8" src={String(logo)} alt="TroopHunter" />
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
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Already a member?{' '}
            <Link to="/signin" className="font-semibold text-indigo-500 hover:text-indigo-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default _ForgotPassword;
