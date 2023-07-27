import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLeadService } from '../../services/leadServices';
import { fetchUserAction } from '../actions/userActions';

function* createLeadSaga({ payload }: any): any {
  try {
    const { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId, token } = payload;
    const response = yield createLeadService({ userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId }, token);

    if (response.success) {
      toast.success(response.message);
      yield put(fetchUserAction({ token, userId })); // Assuming fetchUserAction is another saga to fetch user data after creating a lead.
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function* watchLeadSaga() {
  yield takeLatest('lead/createLead', createLeadSaga);
}
