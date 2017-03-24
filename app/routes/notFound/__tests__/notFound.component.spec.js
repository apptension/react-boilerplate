import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Helmet from 'react-helmet';

import { NotFound } from '../notFound.component';


describe('NotFound: Component', () => {
  const component = (props) => (
    <NotFound {...props} />
  );

  it('should not render not-found root', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.not-found')).to.have.length(1);
  });

  it('should render <Helmet/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(Helmet)).to.have.length(1);
  });

  it('should pass title prop to <Helmet/>', () => {
    const wrapper = shallow(component({}));
    const helmetProps = wrapper.find(Helmet).props();

    expect(helmetProps.title).to.be.a('string');
  });
});
