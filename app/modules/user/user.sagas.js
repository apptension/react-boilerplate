import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import request from '../../utils/request';
import { getUsersSuccess, getUsersError } from './user.actions';
import { GET_USERS } from './user.constants';


export function* loadUsers() {
  try {
    const data = yield call(request, '/mock/users.json');
    yield put(getUsersSuccess(data));
  } catch (e) {
    yield put(getUsersError(e.message));
  }
}

export function* loadUsersSaga() {
  yield takeLatest(GET_USERS, loadUsers);
}

export default [
  loadUsersSaga,
];
