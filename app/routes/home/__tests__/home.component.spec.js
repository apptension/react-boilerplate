import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { fromJS } from 'immutable';

import { Home } from '../home.component';


describe('Home: Component', () => {
  const defaultProps = {
    fetchMaintainers: () => {},
    items: fromJS([{ name: 'name-1' }, { name: 'name-2' }, { name: 'name-3' }]),
    language: 'en',
    setLanguage: () => {},
    location: {},
    match: {},
    history: { push: () => {} },
  };

  const component = (props) => (
    <Home {...defaultProps} {...props} />
  );

  it('should render Home root', () => {
    const wrapper = shallow(component({}));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch fetchMaintainers action on mount', () => {
    const fetchMaintainers = spy();
    shallow(component({ fetchMaintainers }));

    expect(fetchMaintainers).to.have.been.calledWith(defaultProps.language);
  });

  it('should dispatch fetchMaintainers action on language change', () => {
    const fetchMaintainers = spy();
    const newLanguage = 'de';
    const wrapper = shallow(component({ fetchMaintainers, language: 'en' }));
    fetchMaintainers.resetHistory();
    wrapper.setProps({ language: newLanguage });

    expect(fetchMaintainers).to.have.been.calledWith(newLanguage);
  });
});
