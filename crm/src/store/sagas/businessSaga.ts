import { toast } from 'react-toastify';
import { takeLatest, put, select, type ForkEffect } from 'redux-saga/effects';
import { type IBusinessFetchRequestAttributes, type IPaginationAttributes, type IBusinessAttributes } from 'validator/interfaces';

import { getBusinessesBySearchService } from '../../services/businessService';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction, fetchBusinessesAction } from '../actions/businessActions';
import { setHomePageLoadingFailureAction, setHomePageLoadingSuccessAction } from '../actions/homePageActions';
import { type IBusinessState } from '../reducers/businessReducer';

export interface IBusinessesFetchPayload extends IBusinessFetchRequestAttributes, IPaginationAttributes {
  token: string;
}

function* fetchBusinessesSaga({ payload }: { payload: IBusinessesFetchPayload }): any {
  try {
    const { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, sponsoredAd } = payload;
    const { page, limit } = payload;
    const { token } = payload;
    const params: Omit<IBusinessesFetchPayload, 'token'> = { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, page, limit };
    const { businesses }: { businesses: IBusinessState } = yield select((state: { businesses: IBusinessState }) => state);
    const businessesDataBusinesses: Record<string, IBusinessAttributes> = businesses.data.businesses;

    if (sponsoredAd ?? false) {
      params.sponsoredAd = sponsoredAd;
    } else {
      delete params.sponsoredAd;
    }

    const response = yield getBusinessesBySearchService(params, token);

    if (response.success === true) {
      if (page === 1) {
        const { data }: IBusinessState = response as IBusinessState;
        yield put(fetchBusinessesSuccessAction({ data }));
        yield put(setHomePageLoadingSuccessAction());
      } else {
        const totalRecords = response.data.totalRecords;
        const totalPages = response.data.totalPages;
        const mergedBusinesses = { ...businessesDataBusinesses, ...response.data.businesses };
        const state: IBusinessState = {
          data: { businesses: mergedBusinesses, totalPages, totalRecords }
        };

        yield put(fetchBusinessesSuccessAction(state));
        yield put(setHomePageLoadingSuccessAction());
      }
    } else {
      toast.error(response.error);
      yield put(fetchBusinessesFailureAction(response.error));
      yield put(setHomePageLoadingFailureAction());
    }
  } catch (error) {
    // Display toast message for error
    toast.error((error as Error).message);
    yield put(fetchBusinessesFailureAction());
  }
}

export function* watchBusinessSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(fetchBusinessesAction, fetchBusinessesSaga);
}
