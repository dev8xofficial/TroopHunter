import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { deleteLeadsSuccessAction, deleteLeadsFailureAction } from '../actions/listsPageActions';
import { deleteLeadsService } from '../../services/leadServices';
import { updateUserLocallyAction } from '../actions/userActions';
import { ILead } from '../../types/lead';
import { IUser } from '../../types/user';

function* deleteLeadsSaga({ payload }: any): any {
  try {
    let { user } = payload as { user: IUser };
    const { selectedLeadIds, token } = payload;
    const response = yield deleteLeadsService({ ids: selectedLeadIds }, token);

    if (response.success) {
      // Create a new object with the updated Leads array
      const updatedUser: IUser = {
        ...user,
        Leads: user.Leads.filter((lead: ILead) => !selectedLeadIds.includes(lead.id)),
      };

      yield put(updateUserLocallyAction(updatedUser));
      yield put(deleteLeadsSuccessAction(response.data));
    } else {
      toast.error(response.error);
      yield put(deleteLeadsFailureAction(response.message));
    }
  } catch (error) {
    toast.error(error.message);
    yield put(deleteLeadsFailureAction(error.message));
  }
}

export function* watchDeleteLeadsSaga() {
  yield takeLatest('lists/deleteLeadsAction', deleteLeadsSaga);
}
