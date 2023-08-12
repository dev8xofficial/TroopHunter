import { toast } from 'react-toastify';
import { takeLatest, put, type ForkEffect } from 'redux-saga/effects';
import { type ILeadBuldDeleteRequestAttributes, type ILeadFetchByIdRequestAttributes, type IUserAttributes, type ILeadCreateRequestAttributes, type ILeadAttributes } from 'validator/interfaces';

import { createLeadService, updateLeadService, deleteLeadService, deleteLeadsService } from '../../services/leadServices';
import { resetHomePageFiltersAction, resetHomePageDraftLeadIdAction } from '../actions/homePageActions';
import { createLeadAction, deleteLeadAction, deleteLeadsAction, updateLeadAction } from '../actions/leadActions';
import { resetLeadsPageSelectedLeadIds } from '../actions/leadsPageActions';
import { fetchUserAction, updateUserLocallyAction } from '../actions/userActions';

export interface ICreateLeadPayload extends ILeadCreateRequestAttributes {
  token: string;
  businessIds: string[];
}

function* createLeadSaga({ payload }: { payload: ICreateLeadPayload }): any {
  try {
    const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response = yield createLeadService({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

    if (response.success === true) {
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

function* updateLeadSaga({ payload }: { payload: IUpdateLeadPayload }): any {
  try {
    const { id, userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, token } = payload;
    const response = yield updateLeadService(id, { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }, token);

    if (response.success === true) {
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

function* deleteLeadSaga({ payload }: { payload: IDeleteLeadPayload }): any {
  try {
    const { id, token, user } = payload;
    const response = yield deleteLeadService(id, token);

    if (response.success === true) {
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

function* deleteLeadsSaga({ payload }: { payload: IDeleteLeadsPayload }): any {
  try {
    const { user } = payload as { user: IUserAttributes };
    const { selectedLeadIds, token } = payload;
    const response = yield deleteLeadsService({ selectedLeadIds }, token);

    if (response.success === true) {
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

export function* watchCreateLeadSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(createLeadAction, createLeadSaga);
}

export function* watchUpdateLeadSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(updateLeadAction, updateLeadSaga);
}

export function* watchDeleteLeadSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(deleteLeadAction, deleteLeadSaga);
}

export function* watchDeleteLeadsSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(deleteLeadsAction, deleteLeadsSaga);
}
