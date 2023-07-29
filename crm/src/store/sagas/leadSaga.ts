import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLeadService, updateLeadService, deleteLeadService, deleteLeadsService } from '../../services/leadServices';
import { fetchUserAction, updateUserLocallyAction } from '../actions/userActions';
import { resetHomePageFiltersAction, setHomePageDraftLeadIdAction } from '../actions/homePageActions';
import { IUser } from '../../types/user';
import { ILead } from '../../types/lead';
import { resetSelectedLeadIds } from '../actions/leadsPageActions';

function* createLeadSaga({ payload }: any): any {
  try {
    const { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token, leadBusinessIds } = payload;
    const response = yield createLeadService({ userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, leadBusinessIds }, token);

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

function* updateLeadSaga({ payload }: any): any {
  try {
    const { id, userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token, leadBusinessIds } = payload;
    const response = yield updateLeadService(id, { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, leadBusinessIds }, token);

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

function* deleteLeadSaga({ payload }: any): any {
  try {
    const { id, token, user } = payload;
    const response = yield deleteLeadService(id, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUser = {
        ...user,
        Leads: user.Leads.filter((lead: ILead) => lead.id !== id),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(setHomePageDraftLeadIdAction(''));
      yield put(resetHomePageFiltersAction());
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

function* deleteLeadsSaga({ payload }: any): any {
  try {
    let { user } = payload as { user: IUser };
    const { selectedLeadIds, token } = payload;
    const response = yield deleteLeadsService({ ids: selectedLeadIds }, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUser = {
        ...user,
        Leads: user.Leads.filter((lead: ILead) => !selectedLeadIds.includes(lead.id)),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(resetSelectedLeadIds());
      toast.success(response.message);
    } else {
      toast.error(response.error);
      yield put(resetSelectedLeadIds());
    }
  } catch (error) {
    toast.error(error.message);
    yield put(resetSelectedLeadIds());
  }
}

export function* watchCreateLeadSaga() {
  yield takeLatest('lead/createLeadAction', createLeadSaga);
}

export function* watchUpdateLeadSaga() {
  yield takeLatest('lead/updateLeadAction', updateLeadSaga);
}

export function* watchDeleteLeadSaga() {
  yield takeLatest('lead/deleteLeadAction', deleteLeadSaga);
}

export function* watchDeleteLeadsSaga() {
  yield takeLatest('lead/deleteLeadsAction', deleteLeadsSaga);
}
