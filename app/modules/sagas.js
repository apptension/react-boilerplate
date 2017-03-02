import maintainersSaga from './maintainers/maintainers.sagas';

export default function* rootSaga() {
  yield [
    maintainersSaga(),
  ];
}
