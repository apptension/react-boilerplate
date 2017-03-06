import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { stringify } from 'query-string';

import request from '../../utils/request';
import { getMaintainersSuccess, getMaintainersError } from './maintainers.actions';
import { ACTION_TYPES } from './maintainers.constants';


export function* loadMaintainers(action) {
  try {
    const data = yield call(request, `/fixtures/maintainers.json?${stringify({
      language: action.payload.language,
    })}`);

    yield put(getMaintainersSuccess(data));
  } catch (e) {
    yield put(getMaintainersError(e));
  }
}

export function* loadMaintainersSaga() {
  try {
    yield takeLatest(ACTION_TYPES.GET, loadMaintainers);
  } catch (e) {
    yield put(getMaintainersError(e));
  }
}

export default function* maintainersSaga() {
  yield [
    loadMaintainersSaga(),
  ];
}
