import ForgotPassword from '../pages/ForgotPassword';
// import Landing from '../pages/Landing';
import Lead from '../pages/Lead';
import Leads from '../pages/Leads';
import PageNotFound from '../pages/PageNotFound';
import ResetPassword from '../pages/ResetPassword';
import SettingsProfile from '../pages/SettingsProfile';
import SettingsSecurity from '../pages/SettingsSecurity';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Verified from '../pages/Verified';

export interface URL {
  path: string;
  isPublic: boolean;
  isAuth: boolean;
  component: React.ComponentType; // Use React.ComponentType here
}

export const PAGENOTFOUND_URL = '*'; // Wildcard route for PageNotFound
export const HOME_URL = '/';
export const LEAD_URL = '/lead';
export const LOGIN_URL = '/signin';
export const SIGNUP_URL = '/signup';
export const VERIFIED_URL = '/verify/:id/:token';
export const FORGOTPASSWORD_URL = '/forgot-password';
export const RESETPASSWORD_URL = '/reset-password/:id/:token';
export const LEADS_URL = '/leads';
export const SETTINGS_PROFILE_URL = '/settings/profile';
export const SETTINGS_SECURITY_URL = '/settings/security';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, isAuth: true, component: SignIn },
  { path: SIGNUP_URL, isPublic: true, isAuth: true, component: SignUp },
  { path: FORGOTPASSWORD_URL, isPublic: true, isAuth: true, component: ForgotPassword },
  { path: RESETPASSWORD_URL, isPublic: true, isAuth: true, component: ResetPassword },
  { path: HOME_URL, isPublic: true, isAuth: true, component: SignIn },
  { path: LEAD_URL, isPublic: false, isAuth: false, component: Lead },
  { path: LEADS_URL, isPublic: false, isAuth: false, component: Leads },
  { path: SETTINGS_PROFILE_URL, isPublic: false, isAuth: false, component: SettingsProfile },
  { path: SETTINGS_SECURITY_URL, isPublic: false, isAuth: false, component: SettingsSecurity },
  { path: PAGENOTFOUND_URL, isPublic: true, isAuth: false, component: PageNotFound }, // Add PageNotFound route
  { path: VERIFIED_URL, isPublic: true, isAuth: false, component: Verified }
];
