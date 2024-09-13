import React, { useEffect } from 'react';

import { CheckIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { authVerifyUserAction } from '../store/actions/authActions';
import { type IAuthState } from '../store/reducers/authReducer';

const PageNotFound: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  useEffect(() => {
    if (token != null && id != null) {
      dispatch(
        authVerifyUserAction({
          id,
          token
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div>
          {auth.isUserVerified ? <CheckIcon className="h-8 text-green-500" /> : <p className="text-base font-semibold text-red-600">500</p>}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Verification {auth.isUserVerified ? 'completed' : 'failed'}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">We appreciate your patience{auth.isUserVerified ? ', now you can sign in to proceed.' : '.'}</p>
          <div className="mt-10">
            <Link to="/signin" className="text-sm font-semibold text-indigo-600">
              <span className="mr-2" aria-hidden="true">
                &larr;
              </span>
              {auth.isUserVerified ? 'Sign in' : 'Back to home'}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
