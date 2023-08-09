import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { createLeadService, updateLeadService, deleteLeadService, deleteLeadsService } from '../../services/leadServices';
import { fetchUserAction, updateUserLocallyAction } from '../actions/userActions';
import { resetHomePageFiltersAction, resetHomePageDraftLeadIdAction } from '../actions/homePageActions';
import { IUserResponseAttributes } from 'common/interfaces/User';
import { ILeadRequestAttributes, ILeadResponseAttributes } from 'common/interfaces/Lead';
import { resetLeadsPageSelectedLeadIds } from '../actions/leadsPageActions';
import { createLeadAction, deleteLeadAction, deleteLeadsAction, updateLeadAction } from '../actions/leadActions';

export interface ICreateLeadPayload extends ILeadRequestAttributes {
  token: string;
  businessIds: string[];
}

function* createLeadSaga({ payload }: { payload: ICreateLeadPayload }): any {
  try {
    const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response = yield createLeadService({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

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

export interface IUpdateLeadPayload extends ILeadResponseAttributes {
  token: string;
  businessIds: string[];
}

function* updateLeadSaga({ payload }: { payload: IUpdateLeadPayload }): any {
  try {
    const { id, userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response = yield updateLeadService(id, { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

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

export interface IDeleteLeadPayload {
  token: string;
  id: string;
  user: IUserResponseAttributes;
}

function* deleteLeadSaga({ payload }: { payload: IDeleteLeadPayload }): any {
  try {
    const { id, token, user } = payload;
    const response = yield deleteLeadService(id, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUserResponseAttributes = {
        ...user,
        Leads: user.Leads.filter((lead: ILeadResponseAttributes) => lead.id !== id),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(resetHomePageDraftLeadIdAction(''));
      yield put(resetHomePageFiltersAction());
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export interface IDeleteLeadsPayload {
  token: string;
  user: IUserResponseAttributes;
  selectedLeadIds: string[];
}

function* deleteLeadsSaga({ payload }: { payload: IDeleteLeadsPayload }): any {
  try {
    let { user } = payload as { user: IUserResponseAttributes };
    const { selectedLeadIds, token } = payload;
    const response = yield deleteLeadsService({ ids: selectedLeadIds }, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUserResponseAttributes = {
        ...user,
        Leads: user.Leads.filter((lead: ILeadResponseAttributes) => !selectedLeadIds.includes(lead.id)),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(resetLeadsPageSelectedLeadIds());
      toast.success(response.message);
    } else {
      toast.error(response.error);
      yield put(resetLeadsPageSelectedLeadIds());
    }
  } catch (error) {
    toast.error(error.message);
    yield put(resetLeadsPageSelectedLeadIds());
  }
}

export function* watchCreateLeadSaga() {
  yield takeLatest(createLeadAction, createLeadSaga);
}

export function* watchUpdateLeadSaga() {
  yield takeLatest(updateLeadAction, updateLeadSaga);
}

export function* watchDeleteLeadSaga() {
  yield takeLatest(deleteLeadAction, deleteLeadSaga);
}

export function* watchDeleteLeadsSaga() {
  yield takeLatest(deleteLeadsAction, deleteLeadsSaga);
}
