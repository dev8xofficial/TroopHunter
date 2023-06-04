import _SignIn from '../pages/_SignIn';
import _SignUp from '../pages/_SignUp';
// import Lead from '../pages/Lead';
import Home from '../pages/Home';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/register';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, component: _SignIn },
  { path: SIGNUP_URL, isPublic: true, component: _SignUp },
  { path: HOME_URL, isPublic: false, component: Home },
];
