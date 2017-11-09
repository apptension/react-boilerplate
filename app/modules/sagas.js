import { all, fork } from 'redux-saga/effects';
import maintainersSaga from './maintainers/maintainers.sagas';

export default function* rootSaga() {
  yield all([
    fork(maintainersSaga),
  ]);
}
