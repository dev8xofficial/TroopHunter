import React, { useEffect } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Inputs/Button/Button';
import TextField from '../components/Inputs/TextField/TextField';
import { authResetPasswordAction, authResetPasswordVerificationAction } from '../store/actions/authActions';
import { type IAuthState } from '../store/reducers/authReducer';
import { type IResetPasswordFormmValues } from '../types/formik';

const _ResetPassword: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  const initialValues: IResetPasswordFormmValues = {
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
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            navigate
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
      <Helmet>
        <title>Reset Password - TroopHunter</title>
        <meta name="description" content="Reset your password to access your TroopHunter account securely." />
        <link rel="canonical" href="https://www.troophunter.com/reset-password/:id/:token" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Reset Password - TroopHunter" />
        <meta property="og:description" content="Reset your password to access your TroopHunter account securely." />
        <meta property="og:image" content="https://www.troophunter.com/logo-social.svg" />
        <meta property="og:url" content="https://www.troophunter.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reset Password - TroopHunter" />
        <meta name="twitter:description" content="Reset your password to access your TroopHunter account securely." />
        <meta name="twitter:image" content="https://www.troophunter.com/logo-social.svg" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Helmet>

      <div>
        <img className="h-8" src="https://www.troophunter.com/logo.svg" alt="TroopHunter" />
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
              <TextField label="Password" type="password" name="newPassword" value={formik.values?.newPassword} onChange={formik.handleChange} required />
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

export default _ResetPassword;
