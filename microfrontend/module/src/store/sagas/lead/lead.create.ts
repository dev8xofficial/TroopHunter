import { type ILeadCreateRequestAttributes, type ILeadAttributes, type ApiResponse } from '@repo/validator';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';

import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { createLeadAction, createLeadSuccessAction } from '../../actions/leadActions';
import { fetchUserAction } from '../../actions/userActions';

export interface ICreateLeadPayload extends ILeadCreateRequestAttributes {
  accessToken: string;
  businessIds: string[];
}

function* createLeadSaga({ payload }: { payload: ICreateLeadPayload }): Generator<StrictEffect, void, void> {
  try {
    const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, accessToken } = payload;

    const apiPayload = {
      url: '/leads',
      method: 'POST',
      data: removeEmptyStringValues({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }),
      onSuccess: 'lead/createLeadSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface ICreateLeadSuccessPayload {
  request: IApiRequestAttributes<ICreateLeadPayload, ICreateLeadPayload, undefined>;
  response: ApiResponse<ILeadAttributes>;
}

function* createLeadSuccessSaga({ payload }: { payload: ICreateLeadSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;
    debugger;

    if (response.success && request.data != null) {
      toast.success(response.message);
      yield put(fetchUserAction({ userId: request.data?.userId }));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchCreateLeadSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(createLeadAction, createLeadSaga);
}

export function* watchCreateLeadSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(createLeadSuccessAction, createLeadSuccessSaga);
}
