/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { type IAuthState } from '../store/reducers/authReducer';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const auth = useSelector((state: { auth: IAuthState }) => state.auth);

    useEffect(() => {
      if (!auth.accessToken) {
        router.replace('/signin');
      }
    }, [auth.accessToken, router]);

    if (!auth.accessToken) {
      return (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white">
          <img className="mx-auto h-8 lg:h-10 2xl:h-12" src="/logo/logo.svg" alt="TroopHunter" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  // ✅ Preserve getLayout if the wrapped component has it
  // @ts-expect-error: TS doesn't know about getLayout
  if (WrappedComponent.getLayout) {
    // @ts-expect-error
    AuthenticatedComponent.getLayout = WrappedComponent.getLayout;
  }

  return AuthenticatedComponent;
};

export default withAuth;
