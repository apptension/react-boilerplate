import { call, put, takeLatest } from 'redux-saga/effects';

import { get } from '../api/api.sagas';
import { MaintainersTypes, MaintainersActions } from './maintainers.redux';


export function* fetchMaintainersSaga({ language }) {
  try {
    const data = yield call(get, '/fixtures/maintainers.json', { language });

    yield put(MaintainersActions.fetchSuccess(data));
  } catch (e) {
    yield put(MaintainersActions.fetchError(e));
  }
}

export default function* maintainersSaga() {
  yield [
    takeLatest(MaintainersTypes.FETCH, fetchMaintainersSaga),
  ];
}
