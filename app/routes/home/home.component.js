import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';

import messages from './home.messages';
import { MaintainerList } from './maintainerList/maintainerList.component';
import { LanguageSelector } from './languageSelector/languageSelector.component';


export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchMaintainers(this.props.language);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.fetchMaintainers(nextProps.language);
    }
  }

  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
        />

        <h1 className="home__title">
          <i className="home__title-logo" />
          <FormattedMessage {...messages.welcome} />
        </h1>

        <div>Environment: {envConfig.name}</div>

        <MaintainerList items={this.props.items} />

        <LanguageSelector
          language={this.props.language}
          setLanguage={this.props.setLanguage}
          router={this.props.router}
        />
      </div>
    );
  }
}
