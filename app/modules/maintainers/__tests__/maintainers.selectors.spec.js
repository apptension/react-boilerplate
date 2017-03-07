import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectMaintainersList } from '../maintainers.selectors';

describe('Maintainers: selectors', () => {
  const list = fromJS(['list-item-1', 'list-item-2']);

  const mockedState = fromJS({
    maintainers: {
      list,
    },
  });

  describe('selectMaintainersList', () => {
    it('should select list', () => {
      expect(selectMaintainersList()(mockedState)).to.be.equal(list);
    });
  });
});
