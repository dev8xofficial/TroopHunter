import { type ILeadBuldDeleteRequestAttributes, type ILeadFetchByIdRequestAttributes, type ApiResponse } from '@repo/validator';
import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';

import { removeEmptyStringValues } from '../../../utils/helpers';
import { ApiRequestAction, type IApiRequestAttributes } from '../../actions/apiActions';
import { resetHomePageFiltersAction, resetHomePageDraftLeadIdAction } from '../../actions/homePageActions';
import { deleteLeadAction, deleteLeadSuccessAction, deleteLeadsAction, deleteLeadsSuccessAction } from '../../actions/leadActions';
import { resetLeadsPageSelectedLeadIds } from '../../actions/leadsPageActions';
import { updateUserLeadsAction } from '../../actions/userActions';

export interface IDeleteLeadPayload extends ILeadFetchByIdRequestAttributes {
  accessToken: string;
  userId: string;
}

function* deleteLeadSaga({ payload }: { payload: IDeleteLeadPayload }): Generator<StrictEffect, void, void> {
  try {
    const { id, userId } = payload;

    const apiPayload = {
      url: `/leads/${id}`,
      method: 'DELETE',
      params: removeEmptyStringValues({ selectedLeadIds: [id] }),
      data: { userId },
      onSuccess: 'lead/deleteLeadSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

interface IDeleteLeadRequestPayload {
  userId: string;
}

interface IDeleteLeadRequestParams {
  selectedLeadIds: string[];
}

export interface IDeleteLeadSuccessPayload {
  request: IApiRequestAttributes<IDeleteLeadRequestParams, IDeleteLeadRequestPayload, undefined, undefined>;
  response: ApiResponse<null>;
}

function* deleteLeadSuccessSaga({ payload }: { payload: IDeleteLeadSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;

    if (response.success && request.params !== undefined && request.params !== null && request.data !== undefined && request.data !== null) {
      yield put(updateUserLeadsAction({ userId: request.data?.userId, selectedLeadIds: request.params?.selectedLeadIds }));
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
  accessToken: string;
  userId: string;
}

function* deleteLeadsSaga({ payload }: { payload: IDeleteLeadsPayload }): Generator<StrictEffect, void, void> {
  try {
    const { userId, selectedLeadIds } = payload;

    const apiPayload = {
      url: `/leads/bulk`,
      method: 'DELETE',
      data: { userId, selectedLeadIds },
      onSuccess: 'lead/deleteLeadsSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
    yield put(resetLeadsPageSelectedLeadIds());
  }
}

export interface IDeleteLeadsSuccessPayload {
  request: IApiRequestAttributes<IDeleteLeadsPayload, IDeleteLeadsPayload, undefined, undefined>;
  response: ApiResponse<null>;
}

function* deleteLeadsSuccessSaga({ payload }: { payload: IDeleteLeadsSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;

    if (response.success && request.data !== undefined && request.data !== null && request.data !== undefined && request.data !== null) {
      yield put(updateUserLeadsAction({ userId: request.data?.userId, selectedLeadIds: request.data?.selectedLeadIds }));
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

export function* watchDeleteLeadSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(deleteLeadAction, deleteLeadSaga);
}

export function* watchDeleteLeadSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(deleteLeadSuccessAction, deleteLeadSuccessSaga);
}

export function* watchDeleteLeadsSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(deleteLeadsAction, deleteLeadsSaga);
}

export function* watchDeleteLeadsSuccessSaga(): Generator<StrictEffect, void, void> {
  yield takeLatest(deleteLeadsSuccessAction, deleteLeadsSuccessSaga);
}
