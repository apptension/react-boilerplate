import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import api from '../../services/api';
import { MaintainersTypes, MaintainersActions } from './maintainers.redux';

export function* fetchMaintainers() {
  try {
    const { data } = yield api.get('/mock-api/maintainers');

    return yield put(MaintainersActions.fetchSuccess(data));
  } catch (e) {
    if (e.response) {
      return yield put(MaintainersActions.fetchError(e.response.data));
    }

    return yield reportError(e);
  }
}

export default function* maintainersSaga() {
  yield takeLatest(MaintainersTypes.FETCH, fetchMaintainers);
}
