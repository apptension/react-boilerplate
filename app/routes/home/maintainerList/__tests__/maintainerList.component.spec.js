import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { FormattedMessage } from 'react-intl';

import { MaintainerList } from '../maintainerList.component';
import { Maintainer } from '../../maintainer/maintainer.component';
import messages from '../maintainersList.messages';


describe('MaintainerList: Component', () => {
  const defaultProps = {
    items: fromJS([1, 2, 3]),
  };

  const component = (props) => (
    <MaintainerList {...defaultProps} {...props} />
  );

  it('should render MaintainerList root', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.maintainer-list')).to.have.length(1);
  });

  it('should render maintainer-list__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.maintainer-list__title')).to.have.length(1);
  });

  it('should render title message inside .maintainer-list__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.maintainer-list__title').find(FormattedMessage).prop('id')).to.equal(messages.title.id);
  });

  it('should proper number of <Maintainer />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(Maintainer)).to.have.length(defaultProps.items.size);
  });

  it('should pass data prop to <Maintainer />', () => {
    const wrapper = shallow(component({}));

    defaultProps.items.forEach((item, index) => {
      expect(wrapper.find(Maintainer).at(index).prop('data')).to.equal(item);
    });
  });
});
