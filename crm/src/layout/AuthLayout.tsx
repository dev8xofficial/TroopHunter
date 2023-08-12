import React from 'react';
import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <>
      <div className="h-screen">
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 2xl:px-36">
            <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
