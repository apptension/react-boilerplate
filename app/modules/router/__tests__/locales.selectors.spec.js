import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectLocationState } from '../router.selectors';

describe('Locales: selectors', () => {
  const location = { someLocationKey: 'some-location-data' };

  const mockedState = fromJS({
    route: location,
  });

  describe('selectLocationState', () => {
    it('should select location', () => {
      expect(selectLocationState()(mockedState)).to.deep.equal(location);
    });
  });
});
