import { toast } from 'react-toastify';
import { takeLatest, put, select, type StrictEffect, call } from 'redux-saga/effects';
import { type IBusinessFetchRequestAttributes, type IPaginationAttributes, type ApiResponse } from 'validator/interfaces';

import { getBusinessesBySearchService } from '../../services/businessService';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction, fetchBusinessesAction } from '../actions/businessActions';
import { setHomePageLoadingFailureAction, setHomePageLoadingSuccessAction } from '../actions/homePageActions';
import { type IBusinessStateData, type IBusinessState } from '../reducers/businessReducer';

export interface IBusinessesFetchPayload extends IBusinessFetchRequestAttributes, IPaginationAttributes {
  token: string;
}

function* fetchBusinessesSaga({ payload }: { payload: IBusinessesFetchPayload }): Generator<StrictEffect, void, ApiResponse<IBusinessStateData>> {
  try {
    const { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, sponsoredAd } = payload;
    const { page, limit } = payload;
    const { token } = payload;
    const params: Omit<IBusinessesFetchPayload, 'token'> = { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, page, limit };
    const businesses = yield select((state: { businesses: IBusinessState }) => state.businesses);

    if (sponsoredAd ?? false) {
      params.sponsoredAd = sponsoredAd;
    } else {
      delete params.sponsoredAd;
    }

    const response: ApiResponse<IBusinessStateData> = yield call(getBusinessesBySearchService, params, token);

    if (response.success && response.data !== undefined) {
      if (page === 1) {
        yield put(fetchBusinessesSuccessAction({ data: response.data }));
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

        yield put(fetchBusinessesSuccessAction(state));
        yield put(setHomePageLoadingSuccessAction());
      }
    } else {
      toast.error(response.error);
      yield put(fetchBusinessesFailureAction());
      yield put(setHomePageLoadingFailureAction());
    }
  } catch (error) {
    // Display toast message for error
    toast.error((error as Error).message);
    yield put(fetchBusinessesFailureAction());
  }
}

export function* watchBusinessSaga(): Generator<StrictEffect, void, ApiResponse<IBusinessStateData>> {
  yield takeLatest(fetchBusinessesAction, fetchBusinessesSaga);
}
