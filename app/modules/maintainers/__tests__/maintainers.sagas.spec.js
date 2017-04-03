import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { sandbox } from 'sinon';

import maintainersSaga, {} from '../maintainers.sagas';
import * as apiSaga from '../../api/api.sagas';
import { MaintainersActions } from '../maintainers.redux';


describe('Maintainers: sagas', () => {
  let sagaTester = null;
  let userSandbox = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: fromJS({
        // locales: { language: 'en' },
        // user: { redirectUrl: '/some-url' },
      }),
    });
    sagaTester.start(maintainersSaga);

    userSandbox = sandbox.create();
    userSandbox.stub(global, 'fetch').callsFake(() => Promise.resolve({
      json: () => {},
    }));
  });

  afterEach(() => {
    userSandbox.restore();
  });

  describe('loginSaga', () => {
    it('should pass proper params to get', () => {
      userSandbox.stub(apiSaga, 'get').callsFake(() => 'somedata');

      sagaTester.dispatch(MaintainersActions.fetch('en'));

      expect(apiSaga.get.firstCall.args).to.deep.equal([
        '/fixtures/maintainers.json', { language: 'en' },
      ]);
    });

    it('should dispatch fetchSuccess action after successful API call', () => {
      userSandbox.stub(apiSaga, 'get').callsFake(() => 'somedata');

      sagaTester.dispatch(MaintainersActions.fetch('en'));

      expect(sagaTester.getCalledActions()).to.include(MaintainersActions.fetchSuccess('somedata'));
    });

    it('should dispatch fetchError action after not successful API call', () => {
      userSandbox.stub(apiSaga, 'get').callsFake(() => {
        throw 'error';
      });

      sagaTester.dispatch(MaintainersActions.fetch('en'));

      expect(sagaTester.getCalledActions()).to.include(MaintainersActions.fetchError('error'));
    });
  });
});
