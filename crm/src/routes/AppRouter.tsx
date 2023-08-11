import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { IAuthState } from '../store/reducers/authReducer';

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
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

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
                  <PublicRoute userToken={auth.token}>
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
                  <PrivateRoute userToken={auth.token}>
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
