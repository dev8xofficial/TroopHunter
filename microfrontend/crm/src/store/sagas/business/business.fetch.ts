import { type IBusinessFetchRequestAttributes, type IPaginationAttributes, type ApiResponse } from '@repo/validator';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect, select } from 'redux-saga/effects';

import { removeEmptyStringValues } from '../../../utils/helpers';
import { type IApiRequestAttributes, ApiRequestAction } from '../../actions/apiActions';
import { addBusinessesLocallyAction, failedToAddBusinessesLocallyAction, fetchBusinessesAction, fetchBusinessesSuccessAction } from '../../actions/businessActions';
import { setHomePageLoadingFailureAction, setHomePageLoadingSuccessAction } from '../../actions/homePageActions';
import { type IBusinessState, type IBusinessStateData } from '../../reducers/businessReducer';

export interface IBusinessesFetchPayload extends Omit<IBusinessFetchRequestAttributes, 'geoPoint' | 'BusinessPhone'>, IPaginationAttributes {
  accessToken: string;
  sort?: string;
}

function* fetchBusinessesSaga({ payload }: { payload: IBusinessesFetchPayload }): Generator<StrictEffect, void, void> {
  try {
    const { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, sponsoredAd } = payload;
    const { page, limit, sort } = payload;
    const params: Omit<IBusinessesFetchPayload, 'accessToken'> = { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, page, limit, sort };

    if (sponsoredAd ?? false) {
      params.sponsoredAd = sponsoredAd;
    } else {
      delete params.sponsoredAd;
    }

    const apiPayload = {
      url: '/businesses/search',
      method: 'GET',
      params: removeEmptyStringValues(params),
      onSuccess: 'business/fetchBusinessesSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
    yield put(failedToAddBusinessesLocallyAction());
  }
}

export interface IBusinessesFetchSuccessPayload {
  request: IApiRequestAttributes<Omit<IBusinessesFetchPayload, 'accessToken'>, undefined, undefined>;
  response: ApiResponse<IBusinessStateData>;
}

function* fetchBusinessesSuccessSaga({ payload }: { payload: IBusinessesFetchSuccessPayload }): Generator<StrictEffect, void, IBusinessState> {
  const { request, response } = payload;
  const { params } = request;
  const businesses = yield select((state: { businesses: IBusinessState }) => state.businesses);

  if (response.success && response.data !== undefined) {
    if (params?.page === 1) {
      yield put(addBusinessesLocallyAction({ data: response.data }));
      yield put(setHomePageLoadingSuccessAction());
    } else {
      const businessesDataBusinesses = businesses.data !== undefined ? businesses.data.businesses : {};
      const data: IBusinessStateData = response.data;
      const totalRecords: number = data.totalRecords;
      const totalPages: number = data.totalPages;
      const mergedBusinesses = { ...businessesDataBusinesses, ...data.businesses };
      const state: IBusinessState = {
        data: { businesses: mergedBusinesses, totalPages, totalRecords }
      };

      yield put(addBusinessesLocallyAction(state));
      yield put(setHomePageLoadingSuccessAction());
    }
  } else {
    toast.error(response.error);
    yield put(failedToAddBusinessesLocallyAction());
    yield put(setHomePageLoadingFailureAction());
  }
}

export function* watchBusinessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(fetchBusinessesAction, fetchBusinessesSaga);
}

export function* watchBusinessSuccessSaga(): Generator<StrictEffect, void, IBusinessStateData> {
  yield takeLatest(fetchBusinessesSuccessAction, fetchBusinessesSuccessSaga);
}
