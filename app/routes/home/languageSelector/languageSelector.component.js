import React, { PropTypes, PureComponent } from 'react';
import { get } from 'lodash';

import { appLocales } from '../../../i18n';
import { DEFAULT_LOCALE } from '../../../modules/locales/locales.redux';


export class LanguageSelector extends PureComponent {
  static propTypes = {
    language: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleLanguageChange = ({ target: { value } }) => {
    this.props.setLanguage(value);

    const currentLanguage = get(this.props.match, 'params.lang', DEFAULT_LOCALE);
    let targetUrl = this.props.match.url.replace(currentLanguage, value);
    if (targetUrl.slice(-1) === '/' && targetUrl !== '/') {
      targetUrl = targetUrl.slice(0, -1);
    }

    this.props.history.push(targetUrl);
  };

  render() {
    return (
      <select className="language-selector" value={this.props.language} onChange={this.handleLanguageChange}>
        {appLocales.map((locale, index) => (
          <option key={index} value={locale}>{locale}</option>
        ))}
      </select>
    );
  }
}
