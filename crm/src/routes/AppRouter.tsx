import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';

export const PublicRoute = ({ userToken, children }: any) => {
  if (userToken) {
    return <Navigate to="/" />;
  }
  return children;
};

export const PrivateRoute = ({ userToken, children }: any) => {
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRouter: FC = () => {
  const userToken = localStorage.getItem('token');

  return (
    <>
      <Routes>
        {URLS.map((obj: any) => {
          return obj.isPublic ? (
            <React.Fragment key={obj.path}>
              {obj.path == '*' ? (
                <Route path={obj.path} element={<obj.component />} key={obj.path} />
              ) : (
                <Route
                  path={obj.path}
                  element={
                    <PublicRoute userToken={userToken}>
                      <AuthLayout>
                        <obj.component />
                      </AuthLayout>
                    </PublicRoute>
                  }
                  key={obj.path}
                />
              )}
            </React.Fragment>
          ) : (
            <Route
              path={obj.path}
              element={
                <PrivateRoute userToken={userToken}>
                  <DefaultLayout>
                    <obj.component />
                  </DefaultLayout>
                </PrivateRoute>
              }
              key={obj.path}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default AppRouter;
