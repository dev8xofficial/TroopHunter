import React, { useEffect } from 'react';

import { CheckIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout from '../../../../layout/AuthLayout';
import withGuest from '../../../../middleware/withGuest';
import { authVerifyUserAction } from '../../../../store/actions/authActions';
import { type IAuthState } from '../../../../store/reducers/authReducer';
import type { NextPageWithLayout } from '../../../_app';

const PageNotFound: NextPageWithLayout = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { queryId, queryToken } = router.query;
  const id = Array.isArray(queryId) ? queryId[0] : queryId;
  const token = Array.isArray(queryToken) ? queryToken[0] : queryToken;
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
      <Head>
        <title>Account Verified - TroopHunter</title>
        <meta name="description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
        <link rel="canonical" href="/verify/:id/:token" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Account Verified - TroopHunter" />
        <meta property="og:description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
        <meta property="og:url" content="" />
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:image" content="/logo/logo-social.png" />
        <meta property="og:image:secure_url" content="/logo/logo-social.png"></meta>
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="TroopHunter"></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Account Verified - TroopHunter" />
        <meta name="twitter:description" content="Your account has been successfully verified. You can now access all features of TroopHunter." />
        <meta name="twitter:image" content="/logo/logo-social.png" />
        <meta name="twitter:site" content="@TroopHunter" />
      </Head>

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div>
          {auth.isUserVerified ? <CheckIcon className="h-8 text-green-500" /> : <p className="text-base font-semibold text-red-600">500</p>}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Verification {auth.isUserVerified ? 'completed' : 'failed'}</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">We appreciate your patience{auth.isUserVerified ? ', now you can sign in to proceed.' : '.'}</p>
          <div className="mt-10">
            <Link href="/signin" className="text-sm font-semibold text-indigo-600">
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

PageNotFound.getLayout = (page: React.ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default withGuest(PageNotFound);
