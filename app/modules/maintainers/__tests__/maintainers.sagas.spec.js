import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { OK, BAD_REQUEST } from 'http-status-codes';

import maintainersSaga from '../maintainers.sagas';
import { MaintainersActions, MaintainersTypes } from '../maintainers.redux';

import mockApi from '../../../utils/mockApi';

describe('Maintainers: sagas', () => {
  const defaultState = fromJS({});

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(maintainersSaga);
    return sagaTester;
  };

  it('should dispatch fetchSuccess action after successful API call', async () => {
    const sagaTester = getSagaTester();
    const language = 'en';
    const response = { respProp: 'respValue' };
    mockApi.get('/mock-api/maintainers').reply(OK, response);

    sagaTester.dispatch(MaintainersActions.fetch(language));
    await sagaTester.waitFor(MaintainersTypes.FETCH_SUCCESS);

    expect(sagaTester.getCalledActions()).to.deep.include(MaintainersActions.fetchSuccess(response));
  });

  it('should dispatch fetchError action after unsuccessful API call', async () => {
    const sagaTester = getSagaTester();
    const language = 'en';
    const response = { errorProp: 'errorValue' };
    mockApi.get('/mock-api/maintainers').reply(BAD_REQUEST, response);

    sagaTester.dispatch(MaintainersActions.fetch(language));
    await sagaTester.waitFor(MaintainersTypes.FETCH_ERROR);

    expect(sagaTester.getCalledActions()).to.deep.include(MaintainersActions.fetchError(response));
  });
});
