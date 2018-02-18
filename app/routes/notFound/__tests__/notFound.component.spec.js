import React from 'react';
import { shallow } from 'enzyme';

import { NotFound } from '../notFound.component';


describe('NotFound: Component', () => {
  const component = (props) => (
    <NotFound {...props} />
  );

  it('should not render not-found root', () => {
    const wrapper = shallow(component({}));
    global.expect(wrapper).toMatchSnapshot();
  });
});
