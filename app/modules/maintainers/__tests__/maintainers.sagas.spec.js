import { fork, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { expect } from 'chai';

import request from '../../../utils/request';
import maintainersSaga, { getMaintainersSaga, fetchMaintainersSaga } from '../maintainers.sagas';
import { maintainersActions, maintainersActionsTypes } from '../maintainers.actions';


describe('Maintainers: sagas', () => {
  describe('maintainersSaga', () => {
    it('should yield all aggregated sagas', () => {
      const maintainersGenerator = maintainersSaga();

      const result = maintainersGenerator.next();

      expect(result.value).to.include(fork(getMaintainersSaga));

      expect(maintainersGenerator.next().done).to.be.equal(true);
    });
  });

  describe('getMaintainersSaga', () => {
    it('should take latest GET action', () => {
      const loadMaintainersGenerator = getMaintainersSaga();

      expect(loadMaintainersGenerator.next().value)
        .to.deep.equal(call(takeLatest, maintainersActionsTypes.GET_MAINTAINERS, fetchMaintainersSaga));
    });

    it('should dispatch error action on exception', () => {
      const loadMaintainersGenerator = getMaintainersSaga();
      const error = new Error('error');

      loadMaintainersGenerator.next();
      expect(loadMaintainersGenerator.throw(error).value)
        .to.deep.equal(put(maintainersActions.getMaintainersError(error)));
    });
  });

  describe('fetchMaintainersSaga', () => {
    it('should call request function with proper url', () => {
      const action = { payload: { language: 'en' } };
      const fetchMaintainersGenerator = fetchMaintainersSaga(action);

      expect(fetchMaintainersGenerator.next().value)
        .to.deep.equal(call(request, '/fixtures/maintainers.json?language=en'));
    });

    it('should dispatch getMaintainersSuccess on success request', () => {
      const action = { payload: { language: 'en' } };
      const maintainersData = [1, 2, 3];
      const fetchMaintainersGenerator = fetchMaintainersSaga(action);

      fetchMaintainersGenerator.next();

      expect(fetchMaintainersGenerator.next(maintainersData).value)
        .to.deep.equal(put(maintainersActions.getMaintainersSuccess(maintainersData)));
    });

    it('should dispatch error action on exception', () => {
      const action = { payload: { language: 'en' } };
      const fetchMaintainersGenerator = fetchMaintainersSaga(action);
      const error = new Error('error');

      fetchMaintainersGenerator.next();
      expect(fetchMaintainersGenerator.throw(error).value)
        .to.deep.equal(put(maintainersActions.getMaintainersError(error)));
    });
  });
});
