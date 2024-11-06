import React from 'react';

import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { type URL, URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';
import { type IAuthState } from '../store/reducers/authReducer';

interface PublicRouteProps {
  userToken: string | null | undefined;
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ userToken, children }: PublicRouteProps): JSX.Element => {
  if (userToken?.length != null && userToken.length > 0) {
    return <Navigate to="/lead" />;
  }
  return children;
};

const PrivateRoute: React.FC<PublicRouteProps> = ({ userToken, children }: PublicRouteProps): JSX.Element => {
  if (userToken?.length == null || userToken.length === 0) {
    return <Navigate to="/" />;
  }
  return children;
};

const AppRouter: React.FC = () => {
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  return (
    <>
      <Routes>
        {URLS.map((obj: URL) => {
          return obj.isPublic ? (
            <Route
              key={obj.path}
              path={obj.path}
              element={
                <PublicRoute userToken={auth.accessToken}>
                  {obj.isAuth ? (
                    <AuthLayout>
                      <obj.component />
                    </AuthLayout>
                  ) : (
                    <obj.component />
                  )}
                </PublicRoute>
              }
            />
          ) : (
            <Route
              key={obj.path}
              path={obj.path}
              element={
                <PrivateRoute userToken={auth.accessToken}>
                  <DefaultLayout>
                    <obj.component />
                  </DefaultLayout>
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

export default AppRouter;
