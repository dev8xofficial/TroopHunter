import Home from '../pages/Home';
import Leads from '../pages/Leads';
import PageNotFound from '../pages/PageNotFound';
import Settings from '../pages/Settings';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export interface URL {
  path: string;
  isPublic: boolean;
  component: React.ComponentType; // Use React.ComponentType here
}

export const PAGENOTFOUND_URL = '*'; // Wildcard route for PageNotFound
export const HOME_URL = '/';
export const LOGIN_URL = '/signin';
export const SIGNUP_URL = '/signup';
export const LEADS_URL = '/leads';
export const SETTINGS_URL = '/settings';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, component: SignIn },
  { path: SIGNUP_URL, isPublic: true, component: SignUp },
  { path: HOME_URL, isPublic: false, component: Home },
  { path: LEADS_URL, isPublic: false, component: Leads },
  { path: SETTINGS_URL, isPublic: false, component: Settings },
  { path: PAGENOTFOUND_URL, isPublic: true, component: PageNotFound } // Add PageNotFound route
];
