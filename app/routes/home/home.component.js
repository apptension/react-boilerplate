import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import envConfig from 'env-config';

import messages from './home.messages';
import { MaintainerList } from './maintainerList/maintainerList.component';
import { Container, Title, TitleLogo, EnvName } from './home.styles';

export class Home extends PureComponent {
  static propTypes = {
    items: PropTypes.object,
    language: PropTypes.string.isRequired,
    fetchMaintainers: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.fetchMaintainers(this.props.language);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.fetchMaintainers(this.props.language);
    }
  }

  render() {
    return (
      <Container>
        <Helmet title="Homepage" />

        <Title>
          <TitleLogo name="logo" />
          <FormattedMessage {...messages.welcome} />
        </Title>

        <EnvName>Environment: {envConfig.name}</EnvName>

        <MaintainerList items={this.props.items} />
      </Container>
    );
  }
}
