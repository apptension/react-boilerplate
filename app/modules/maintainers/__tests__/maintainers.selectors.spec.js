import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectMaintainersItems } from '../maintainers.selectors';

describe('Maintainers: selectors', () => {
  const items = fromJS(['list-item-1', 'list-item-2']);

  const mockedState = fromJS({
    maintainers: {
      items,
    },
  });

  describe('selectMaintainersList', () => {
    it('should select list', () => {
      expect(selectMaintainersItems(mockedState)).to.equal(items);
    });
  });
});
