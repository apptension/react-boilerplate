import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import DevToolsComponent from '../devtools.component';


describe('Utils: DevTools Component', () => {
  const store = createStore(
    (state) => state,
    fromJS({}),
    compose(
      DevToolsComponent.instrument()
    )
  );

  const component = (props) => (
    <DevToolsComponent store={store} {...props} />
  );

  it('should render <DockMonitor/>', () => {
    const wrapper = mount(component({}));
    expect(wrapper.find(DockMonitor)).to.have.length(1);
  });

  it('should render <LogMonitor/>', () => {
    const wrapper = mount(component({}));
    expect(wrapper.find(LogMonitor)).to.have.length(1);
  });
});
