import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

import { translationMessages } from '../../i18n';
import { DEFAULT_LOCALE } from '../../modules/locales/locales.redux';
import { App } from '../app.component';


describe('App: Component', () => {
  const children = <div className="app__children">Children</div>;
  const defaultProps = {
    setLanguage: () => {
    },
    language: 'en',
    router: {
      params: {
        lang: 'en',
      },
      push: () => {
      },
    },
  };

  const component = (props) => (
    <App {...defaultProps} {...props}>
      {children}
    </App>
  );

  it('should not render App when language is not set', () => {
    const wrapper = shallow(component({ language: undefined }));
    expect(wrapper.find('.app')).to.have.length(0);
  });

  it('should render App when language is set', () => {
    const wrapper = shallow(component({ language: 'en' }));
    expect(wrapper.find('.app')).to.have.length(1);
  });

  it('should render <Helmet/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(Helmet)).to.have.length(1);
  });

  it('should pass props to <Helmet/>', () => {
    const wrapper = shallow(component({}));
    const helmetProps = wrapper.find(Helmet).props();

    expect(helmetProps.titleTemplate).to.be.a('string');
    expect(helmetProps.defaultTitle).to.be.a('string');
    expect(helmetProps.meta).to.be.an('array');
  });

  it('should render <IntlProvider/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(IntlProvider)).to.have.length(1);
  });

  it('should pass props to <IntlProvider/>', () => {
    const wrapper = shallow(component({}));
    const intlProps = wrapper.find(IntlProvider).props();

    expect(intlProps.locale).to.equal(defaultProps.language);
    expect(intlProps.messages).to.equal(translationMessages[defaultProps.language]);
  });

  it('should render children inside <IntlProvider/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(IntlProvider).contains(children)).to.be.true;
  });

  it('should redirect to /404 when given locale doesn\'t exist', () => {
    const router = {
      params: {
        lang: 'non-existing-locale',
      },
      push: spy(),
    };

    mount(component({ router }));
    expect(router.push.firstCall.args[0]).to.equal('/404');
  });

  it('should set DEFAULT_LOCALE when no lang param is given', () => {
    const setLanguage = spy();
    const router = {
      params: {},
      push: spy(),
    };

    mount(component({ router, setLanguage }));
    expect(setLanguage.firstCall.args[0]).to.equal(DEFAULT_LOCALE);
  });

  it('should set proper language from param', () => {
    const setLanguage = spy();
    const router = {
      params: {
        lang: 'de',
      },
      push: spy(),
    };

    mount(component({ router, setLanguage }));
    expect(setLanguage.firstCall.args[0]).to.equal('de');
  });
});
