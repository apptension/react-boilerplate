import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';

import messages from './home.messages';
import MaintainerList from './maintainerList/maintainerList.component';
import LanguageSelector from './languageSelector/languageSelector.component';


class Home extends PureComponent {
  componentWillMount() {
    this.props.getMaintainers(this.props.language);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      this.props.getMaintainers(nextProps.language);
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

        <MaintainerList items={this.props.maintainers} />

        <LanguageSelector
          language={this.props.language}
          setLanguage={this.props.setLanguage}
          router={this.props.router}
        />
      </div>
    );
  }
}

Home.propTypes = {
  maintainers: PropTypes.object,
  language: PropTypes.string.isRequired,
  getMaintainers: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default Home;
