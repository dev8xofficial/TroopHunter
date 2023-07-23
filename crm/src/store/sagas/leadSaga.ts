import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLead } from '../../services/leadServices';
import { fetchUser } from '../actions/userActions';

function* createLeadSaga({ payload }: any): any {
  try {
    const { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId, token } = payload;
    const response = yield createLead({ userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId }, token);

    if (response.success) {
      toast.success('Successfully create lead.');
      yield put(fetchUser({ token, userId })); // Assuming fetchUser is another saga to fetch user data after creating a lead.
    } else {
      toast.error(`Failed to create lead: ${title}`);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* watchLeadSaga() {
  yield takeLatest('lead/createLead', createLeadSaga);
}
