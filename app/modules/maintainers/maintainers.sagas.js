import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { stringify } from 'query-string';

import request from '../../utils/request';
import { getMaintainersSuccess, getMaintainersError } from './maintainers.actions';
import { ACTION_TYPES } from './maintainers.constants';


export function* fetchMaintainersSaga(action) {
  try {
    const data = yield call(request, `/fixtures/maintainers.json?${stringify({
      language: action.payload.language,
    })}`);

    yield put(getMaintainersSuccess(data));
  } catch (e) {
    yield put(getMaintainersError(e));
  }
}

export function* getMaintainersSaga() {
  try {
    yield call(takeLatest, ACTION_TYPES.GET, fetchMaintainersSaga);
  } catch (e) {
    yield put(getMaintainersError(e));
  }
}

export default function* maintainersSaga() {
  yield [
    fork(getMaintainersSaga),
  ];
}
