import _SignIn from '../pages/_SignIn';
import _SignUp from '../pages/_SignUp';
// import Lead from '../pages/Lead';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import _Settings from '../pages/_Settings';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/register';
export const LISTS_URL = '/lists';
export const SETTINGS_URL = '/settings';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, component: _SignIn },
  { path: SIGNUP_URL, isPublic: true, component: _SignUp },
  { path: HOME_URL, isPublic: false, component: Home },
  { path: LISTS_URL, isPublic: false, component: Lists },
  { path: SETTINGS_URL, isPublic: false, component: _Settings },
];
