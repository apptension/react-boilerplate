import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { MaintainerList } from '../maintainerList.component';


describe('MaintainerList: Component', () => {
  const defaultProps = {
    items: fromJS([{ name: 'name-1' }, { name: 'name-2' }, { name: 'name-3' }]),
  };

  const component = (props) => (
    <MaintainerList {...defaultProps} {...props} />
  );

  it('should render MaintainerList root', () => {
    const wrapper = shallow(component({}));
    global.expect(wrapper).toMatchSnapshot();
  });
});
