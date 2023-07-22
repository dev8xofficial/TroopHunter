import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLead } from '../../services/leadServices';
import { fetchUser } from '../actions/userActions';

function* createLeadSaga({ payload }: any): any {
  try {
    const { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId, token } = payload;
    const response = yield createLead({ userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId }, token);

    if (response) {
      toast('Successfully create lead.');
      yield put(fetchUser({ token: token, userId: userId }));
    } else {
      toast(`Failed to create lead: ${title}`);
    }
  } catch (error) {
    toast(error);
  }
}

export function* watchLeadSaga() {
  yield takeLatest('lead/createLead', createLeadSaga);
}
