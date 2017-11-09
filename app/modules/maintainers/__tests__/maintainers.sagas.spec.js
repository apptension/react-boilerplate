import SagaTester from 'redux-saga-tester';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import MockAdapter from 'axios-mock-adapter';

import api from '../../../services/api';
import maintainersSaga from '../maintainers.sagas';
import { MaintainersActions, MaintainersTypes } from '../maintainers.redux';

const mockApi = new MockAdapter(api);

describe('Maintainers: sagas', () => {
  const defaultState = fromJS({});

  const getSagaTester = (initialState = {}) => {
    const sagaTester = new SagaTester({
      initialState: defaultState.mergeDeep(initialState),
    });
    sagaTester.start(maintainersSaga);
    return sagaTester;
  };

  afterEach(() => {
    mockApi.reset();
  });

  it('should dispatch fetchSuccess action after successful API call', async () => {
    const sagaTester = getSagaTester();
    const language = 'en';
    const response = { respProp: 'respValue' };
    mockApi.onGet('/fixtures/maintainers.json', { params: { language } }).reply(200, response);

    sagaTester.dispatch(MaintainersActions.fetch(language));
    await sagaTester.waitFor(MaintainersTypes.FETCH_SUCCESS);

    expect(sagaTester.getCalledActions()).to.deep.include(MaintainersActions.fetchSuccess(response));
  });

  it('should dispatch fetchError action after unsuccessful API call', async () => {
    const sagaTester = getSagaTester();
    const language = 'en';
    const response = { errorProp: 'errorValue' };
    mockApi.onGet('/fixtures/maintainers.json', { params: { language } }).reply(400, response);

    sagaTester.dispatch(MaintainersActions.fetch(language));
    await sagaTester.waitFor(MaintainersTypes.FETCH_ERROR);

    expect(sagaTester.getCalledActions()).to.deep.include(MaintainersActions.fetchError(response));
  });
});
