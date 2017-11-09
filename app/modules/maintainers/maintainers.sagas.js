import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import api from '../../services/api';
import { MaintainersTypes, MaintainersActions } from './maintainers.redux';

export function* fetchMaintainers({ language }) {
  try {
    const { data } = yield api.get('fixtures/maintainers.json', { params: { language } });

    yield put(MaintainersActions.fetchSuccess(data));
  } catch (e) {
    yield put(MaintainersActions.fetchError(e.response ? e.response.data : e));
    yield reportError(e);
  }
}

export default function* maintainersSaga() {
  yield takeLatest(MaintainersTypes.FETCH, fetchMaintainers);
}
