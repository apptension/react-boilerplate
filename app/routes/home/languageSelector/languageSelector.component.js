import React, { PropTypes, Component } from 'react';
import { get } from 'lodash';

import { DEFAULT_LOCALE } from '../../../modules/locales/locales.constants';


class LanguageSelector extends Component {
  handleLanguageChange = ({ target: { value } }) => {
    this.props.setLanguage(value);

    const currentLanguage = get(this.props.router, 'params.lang', DEFAULT_LOCALE);
    const currentLanguageUrl = currentLanguage !== DEFAULT_LOCALE ? `/${currentLanguage}` : '';
    const targetLanguageUrl = value !== DEFAULT_LOCALE ? `/${value}` : '';

    let targetUrl = this.props.router.location.pathname.replace(currentLanguageUrl, targetLanguageUrl);
    if (targetUrl.slice(-1) === '/' && targetUrl !== '/') {
      targetUrl = targetUrl.slice(0, -1);
    }
    this.props.router.push(targetUrl);
  };

  render() {
    return (
      <select value={this.props.language} onChange={this.handleLanguageChange}>
        <option value="en">en</option>
        <option value="de">de</option>
      </select>
    );
  }
}

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default LanguageSelector;
