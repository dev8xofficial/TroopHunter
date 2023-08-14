import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect, call } from 'redux-saga/effects';
import { type ILeadBuldDeleteRequestAttributes, type ILeadFetchByIdRequestAttributes, type IUserAttributes, type ILeadCreateRequestAttributes, type ILeadAttributes, type ApiResponse } from 'validator/interfaces';

import { createLeadService, updateLeadService, deleteLeadService, deleteLeadsService } from '../../services/leadServices';
import { resetHomePageFiltersAction, resetHomePageDraftLeadIdAction } from '../actions/homePageActions';
import { createLeadAction, deleteLeadAction, deleteLeadsAction, updateLeadAction } from '../actions/leadActions';
import { resetLeadsPageSelectedLeadIds } from '../actions/leadsPageActions';
import { fetchUserAction, updateUserLocallyAction } from '../actions/userActions';

export interface ICreateLeadPayload extends ILeadCreateRequestAttributes {
  token: string;
  businessIds: string[];
}

function* createLeadSaga({ payload }: { payload: ICreateLeadPayload }): Generator<StrictEffect, void, ApiResponse<ILeadAttributes>> {
  try {
    const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response: ApiResponse<ILeadAttributes> = yield call(createLeadService, { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

    if (response.success) {
      toast.success(response.message);
      yield put(fetchUserAction({ token, userId })); // Assuming fetchUserAction is another saga to fetch user data after creating a lead.
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUpdateLeadPayload extends ILeadAttributes {
  token: string;
  businessIds: string[];
}

function* updateLeadSaga({ payload }: { payload: IUpdateLeadPayload }): Generator<StrictEffect, void, ApiResponse<ILeadAttributes>> {
  try {
    const { id, userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response: ApiResponse<ILeadAttributes> = yield call(updateLeadService, id, { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

    if (response.success) {
      toast.success(response.message);
      yield put(fetchUserAction({ token, userId })); // Assuming fetchUserAction is another saga to fetch user data after creating a lead.
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IDeleteLeadPayload extends ILeadFetchByIdRequestAttributes {
  token: string;
  user: IUserAttributes;
}

function* deleteLeadSaga({ payload }: { payload: IDeleteLeadPayload }): Generator<StrictEffect, void, ApiResponse<null>> {
  try {
    const { id, token, user } = payload;
    const response: ApiResponse<null> = yield call(deleteLeadService, id, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUserAttributes = {
        ...user,
        Leads: user.Leads.filter((lead: ILeadAttributes) => lead.id !== id)
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(resetHomePageDraftLeadIdAction(''));
      yield put(resetHomePageFiltersAction());
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IDeleteLeadsPayload extends ILeadBuldDeleteRequestAttributes {
  token: string;
  user: IUserAttributes;
}

function* deleteLeadsSaga({ payload }: { payload: IDeleteLeadsPayload }): Generator<StrictEffect, void, ApiResponse<null>> {
  try {
    const { user } = payload;
    const { selectedLeadIds, token } = payload;
    const response: ApiResponse<null> = yield call(deleteLeadsService, selectedLeadIds, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUserAttributes = {
        ...user,
        Leads: user.Leads.filter((lead: ILeadAttributes) => !selectedLeadIds.includes(lead.id))
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(resetLeadsPageSelectedLeadIds());
      toast.success(response.message);
    } else {
      toast.error(response.error);
      yield put(resetLeadsPageSelectedLeadIds());
    }
  } catch (error) {
    toast.error((error as Error).message);
    yield put(resetLeadsPageSelectedLeadIds());
  }
}

export function* watchCreateLeadSaga(): Generator<StrictEffect, void, ApiResponse<IUserAttributes>> {
  yield takeLatest(createLeadAction, createLeadSaga);
}

export function* watchUpdateLeadSaga(): Generator<StrictEffect, void, ApiResponse<ILeadAttributes>> {
  yield takeLatest(updateLeadAction, updateLeadSaga);
}

export function* watchDeleteLeadSaga(): Generator<StrictEffect, void, ApiResponse<null>> {
  yield takeLatest(deleteLeadAction, deleteLeadSaga);
}

export function* watchDeleteLeadsSaga(): Generator<StrictEffect, void, ApiResponse<null>> {
  yield takeLatest(deleteLeadsAction, deleteLeadsSaga);
}
