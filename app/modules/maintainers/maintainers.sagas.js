import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { stringify } from 'query-string';

import request from '../../utils/request';
import { MaintainersTypes, MaintainersActions } from './maintainers.redux';


export function* fetchMaintainersSaga(action) {
  try {
    const data = yield call(request, `/fixtures/maintainers.json?${stringify({
      language: action.language,
    })}`);

    yield put(MaintainersActions.fetchSuccess(data));
  } catch (e) {
    yield put(MaintainersActions.fetchError(e));
  }
}

export function* getMaintainersSaga() {
  try {
    yield call(takeLatest, MaintainersTypes.FETCH, fetchMaintainersSaga);
  } catch (e) {
    yield put(MaintainersActions.fetchError(e));
  }
}

export default function* maintainersSaga() {
  yield [
    fork(getMaintainersSaga),
  ];
}
