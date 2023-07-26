import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';
import { useSelector } from 'react-redux';

const PublicRoute = ({ userToken, children }: any) => {
  if (userToken) {
    return <Navigate to="/" />;
  }
  return children;
};

const PrivateRoute = ({ userToken, children }: any) => {
  if (!userToken) {
    return <Navigate to="/signin" />;
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
              <Route
                key={obj.path}
                path={obj.path}
                element={
                  <PublicRoute userToken={userToken}>
                    <AuthLayout>
                      <obj.component />
                    </AuthLayout>
                  </PublicRoute>
                }
              />
            ) : (
              <Route
                key={obj.path}
                path={obj.path}
                element={
                  <PrivateRoute userToken={userToken}>
                    <DefaultLayout>
                      <obj.component />
                    </DefaultLayout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
