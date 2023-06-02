import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';
import { useSelector } from 'react-redux';

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
  const userToken = useSelector((state: any) => state.auth.token);

  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default AppRouter;
