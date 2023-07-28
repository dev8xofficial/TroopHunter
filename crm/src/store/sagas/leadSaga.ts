import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLeadService, updateLeadService, deleteLeadService, deleteLeadsService } from '../../services/leadServices';
import { fetchUserAction, updateUserLocallyAction } from '../actions/userActions';
import { resetLeadFiltersAction, setDraftLeadIdAction } from '../actions/leadPageActions';
import { IUser } from '../../types/user';
import { ILead } from '../../types/lead';
import { deleteLeadsFailureAction, deleteLeadsSuccessAction } from '../actions/leadActions';

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

function* updateLeadSaga({ payload }: any): any {
  try {
    debugger;
    const { id, userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId, token } = payload;
    const response = yield updateLeadService(id, { userId, title, search, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, openingHourId, closingHourId }, token);

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
    debugger;
    const { id, token, user } = payload;
    const response = yield deleteLeadService(id, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUser = {
        ...user,
        Leads: user.Leads.filter((lead: ILead) => lead.id !== id),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(setDraftLeadIdAction(''));
      yield put(resetLeadFiltersAction());
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
      yield put(deleteLeadsSuccessAction(response.data));
    } else {
      toast.error(response.error);
      yield put(deleteLeadsFailureAction(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(deleteLeadsFailureAction(error.message));
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
