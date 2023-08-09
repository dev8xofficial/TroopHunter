import { toast } from 'react-toastify';
import { takeLatest, put, select } from 'redux-saga/effects';
import { fetchBusinessesSuccessAction, fetchBusinessesFailureAction, fetchBusinessesAction } from '../actions/businessActions';
import { getBusinessesBySearchService } from '../../services/businessService';
import { setHomePageLoadingFailureAction, setHomePageLoadingSuccessAction } from '../actions/homePageActions';
import { IBusinessFetchRequestAttributes } from 'common/interfaces/Business';
import { PaginationAttributes } from 'common/interfaces/Pagination';
import { IBusinessResponseAttributes } from 'common/interfaces/Business';
import { IBusinessState } from '../reducers/businessReducer';

export interface IBusinessesFetchPayload extends IBusinessFetchRequestAttributes, PaginationAttributes {
  token: string;
}

function* fetchBusinessesSaga({ payload }: { payload: IBusinessesFetchPayload }): any {
  try {
    const { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, sponsoredAd } = payload;
    const { page, limit } = payload;
    const { token } = payload;
    const params = { name, businessDomain, address, cityId, stateId, countryId, phone, email, website, page, limit };
    const { businesses }: { businesses: IBusinessState } = yield select((state: { businesses: IBusinessState }) => state);
    const businessesDataBusinesses: { [key: string]: IBusinessResponseAttributes } = businesses.data.businesses;

    if (sponsoredAd) {
      params['sponsoredAd'] = sponsoredAd;
    }

    const response = yield getBusinessesBySearchService(params, token);

    if (response.success) {
      if (page === 1) {
        const { data }: IBusinessState = response as IBusinessState;
        yield put(fetchBusinessesSuccessAction({ data }));
        yield put(setHomePageLoadingSuccessAction());
      } else {
        const totalRecords = response.data.totalRecords;
        const totalPages = response.data.totalPages;
        const mergedBusinesses = { ...businessesDataBusinesses, ...response.data.businesses };
        const state: IBusinessState = {
          data: { businesses: mergedBusinesses, totalPages, totalRecords },
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
    toast.error(error.message);
    yield put(fetchBusinessesFailureAction(error.message));
  }
}

export function* watchBusinessSaga() {
  yield takeLatest(fetchBusinessesAction, fetchBusinessesSaga);
}
