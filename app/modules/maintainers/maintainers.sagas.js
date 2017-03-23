import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { stringify } from 'query-string';

import request from '../../utils/request';
import { maintainersActions, maintainersActionsTypes } from './maintainers.actions';


export function* fetchMaintainersSaga(action) {
  try {
    const data = yield call(request, `/fixtures/maintainers.json?${stringify({
      language: action.payload.language,
    })}`);

    yield put(maintainersActions.getMaintainersSuccess(data));
  } catch (e) {
    yield put(maintainersActions.getMaintainersError(e));
  }
}

export function* getMaintainersSaga() {
  try {
    yield call(takeLatest, maintainersActionsTypes.GET_MAINTAINERS, fetchMaintainersSaga);
  } catch (e) {
    yield put(maintainersActions.getMaintainersError(e));
  }
}

export default function* maintainersSaga() {
  yield [
    fork(getMaintainersSaga),
  ];
}
