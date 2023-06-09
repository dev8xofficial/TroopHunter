import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import Settings from '../pages/Settings';

export const HOME_URL = '/';
export const LOGIN_URL = '/signin';
export const SIGNUP_URL = '/signup';
export const LISTS_URL = '/lists';
export const SETTINGS_URL = '/settings';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, component: SignIn },
  { path: SIGNUP_URL, isPublic: true, component: SignUp },
  { path: HOME_URL, isPublic: false, component: Home },
  { path: LISTS_URL, isPublic: false, component: Lists },
  { path: SETTINGS_URL, isPublic: false, component: Settings },
];
