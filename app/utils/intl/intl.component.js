import React from 'react';
import { IntlProvider } from 'react-intl';

const LanguageProvider = ({ locale, messages, children }) => (
  <IntlProvider
    locale={locale}
    key={locale}
    messages={messages[locale]}
  >
    {React.Children.only(children)}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  locale: React.PropTypes.string,
  messages: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
};

export default LanguageProvider;
