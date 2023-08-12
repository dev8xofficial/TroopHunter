import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { type URL, URLS } from './Urls';
import AuthLayout from '../layout/AuthLayout';
import DefaultLayout from '../layout/DefaultLayout';
import { type IAuthState } from '../store/reducers/authReducer';

interface PublicRouteProps {
  userToken: string | null | undefined;
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ userToken, children }: PublicRouteProps): JSX.Element => {
  console.log('PublicRoute: ', userToken);
  if (userToken?.length != null && userToken.length > 0) {
    return <Navigate to="/" />;
  }
  return children;
};

const PrivateRoute: React.FC<PublicRouteProps> = ({ userToken, children }: PublicRouteProps): JSX.Element => {
  console.log('PrivateRoute: ', userToken);
  if (userToken?.length == null || userToken.length === 0) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const AppRouter: React.FC = () => {
  const auth = useSelector((state: { auth: IAuthState }) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          {URLS.map((obj: URL) => {
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
