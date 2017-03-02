import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import request from '../../utils/request';
import { getMaintainersSuccess, getMaintainersError } from './maintainers.actions';
import { ACTION_TYPES } from './maintainers.constants';


export function* loadMaintainers() {
  try {
    const data = yield call(request, '/mock/maintainers.json');
    yield put(getMaintainersSuccess(data));
  } catch (e) {
    yield put(getMaintainersError(e.message));
  }
}

export function* loadMaintainersSaga() {
  yield takeLatest(ACTION_TYPES.GET, loadMaintainers);
}

export default function* maintainersSaga() {
  yield [
    loadMaintainersSaga(),
  ];
}
