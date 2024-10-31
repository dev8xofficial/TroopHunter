import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';
import { type ILeadAttributes, type ApiResponse } from 'validator/interfaces';

import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { updateLeadAction, updateLeadSuccessAction } from '../../actions/leadActions';
import { fetchUserAction } from '../../actions/userActions';

export interface IUpdateLeadPayload extends ILeadAttributes {
  accessToken: string;
  businessIds: string[];
}

function* updateLeadSaga({ payload }: { payload: IUpdateLeadPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId, accessToken } = payload;

    const apiPayload = {
      url: `/leads/${id}`,
      method: 'PUT',
      params: { accessToken },
      data: removeEmptyStringValues({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }),
      onSuccess: 'lead/updateLeadSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IUpdateLeadSuccessPayload {
  request: IApiRequestAttributes<IUpdateLeadPayload, IUpdateLeadPayload, undefined>;
  response: ApiResponse<ILeadAttributes>;
}

function* updateLeadSuccessSaga({ payload }: { payload: IUpdateLeadSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;
    if (response.success && request.params !== undefined && request.params !== null && request.data !== undefined && request.data !== null) {
      toast.success(response.message);
      yield put(fetchUserAction({ userId: request.data?.userId }));
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export function* watchUpdateLeadSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(updateLeadAction, updateLeadSaga);
}

export function* watchUpdateSuccessLeadSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(updateLeadSuccessAction, updateLeadSuccessSaga);
}
