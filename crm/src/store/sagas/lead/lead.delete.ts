import { toast } from 'react-toastify';
import { takeLatest, put, type StrictEffect } from 'redux-saga/effects';
import { type ILeadBuldDeleteRequestAttributes, type ILeadFetchByIdRequestAttributes, type ApiResponse } from 'validator/interfaces';

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
      payload: { userId },
      onSuccess: 'lead/deleteLeadSuccessAction',
      requireAuth: true
    };

    yield put(ApiRequestAction(apiPayload));
  } catch (error) {
    toast.error((error as Error).message);
  }
}

export interface IDeleteLeadSuccessPayload {
  request: IApiRequestAttributes<{ selectedLeadIds: string[] }, { userId: string }, undefined>;
  response: ApiResponse<null>;
}

function* deleteLeadSuccessSaga({ payload }: { payload: IDeleteLeadSuccessPayload }): Generator<StrictEffect, void, void> {
  try {
    const { request, response } = payload;

    if (response.success && request.params !== undefined && request.params !== null && request.payload !== undefined && request.payload !== null) {
      yield put(updateUserLeadsAction({ userId: request.payload?.userId, selectedLeadIds: request.params?.selectedLeadIds }));
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

function* deleteLeadsSaga({ payload }: { payload: IDeleteLeadsPayload }): Generator<StrictEffect, void, ApiResponse<null>> {
  try {
    const { userId, selectedLeadIds } = payload;

    const apiPayload = {
      url: `/leads/bulk`,
      method: 'DELETE',
      data: { selectedLeadIds },
      payload: { userId },
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
  request: IApiRequestAttributes<IDeleteLeadsPayload, IDeleteLeadsPayload, undefined>;
  response: ApiResponse<null>;
}

function* deleteLeadsSuccessSaga({ payload }: { payload: IDeleteLeadsSuccessPayload }): Generator<StrictEffect, void, ApiResponse<null>> {
  try {
    const { request, response } = payload;

    if (response.success && request.data !== undefined && request.data !== null && request.payload !== undefined && request.payload !== null) {
      yield put(updateUserLeadsAction({ userId: request.payload?.userId, selectedLeadIds: request.data?.selectedLeadIds }));
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

export function* watchDeleteLeadsSaga(): Generator<StrictEffect, void, ApiResponse<null>> {
  yield takeLatest(deleteLeadsAction, deleteLeadsSaga);
}

export function* watchDeleteLeadsSuccessSaga(): Generator<StrictEffect, void, ApiResponse<null>> {
  yield takeLatest(deleteLeadsSuccessAction, deleteLeadsSuccessSaga);
}
