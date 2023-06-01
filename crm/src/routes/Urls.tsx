import SignIn from '../pages/Authentication/SignIn';
import Signup from '../pages/Authentication/SignUp';
import Lead from '../pages/Lead';
import ECommerce from '../pages/Dashboard/ECommerce';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Chart from '../pages/Chart';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/register';
export const ECOMMERCE_URL = '/ecommerce';
export const CALENDAR_URL = '/calendar';
export const PROFILE_URL = '/profile';
export const FORM_ELEMENT_URL = '/forms/form-elements';
export const FORM_LAYOUT_URL = '/forms/form-layout';
export const TABLES_URL = '/tables';
export const SETTINGS_URL = '/settings';
export const CHART_URL = '/chart';
export const ALERTS_URL = '/ui/alerts';
export const BUTTONS_URL = '/ui/buttons';

export const URLS = [
  { path: LOGIN_URL, isPublic: true, component: SignIn },
  { path: SIGNUP_URL, isPublic: true, component: Signup },
  { path: HOME_URL, isPublic: false, component: Lead },
  { path: ECOMMERCE_URL, isPublic: false, component: ECommerce },
  { path: CALENDAR_URL, isPublic: false, component: Calendar },
  { path: PROFILE_URL, isPublic: false, component: Profile },
  { path: FORM_ELEMENT_URL, isPublic: false, component: FormElements },
  { path: FORM_LAYOUT_URL, isPublic: false, component: FormLayout },
  { path: TABLES_URL, isPublic: false, component: Tables },
  { path: SETTINGS_URL, isPublic: false, component: Settings },
  { path: CHART_URL, isPublic: false, component: Chart },
  { path: ALERTS_URL, isPublic: false, component: Alerts },
  { path: BUTTONS_URL, isPublic: false, component: Buttons },
];
