import React, { PureComponent, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './home.messages';
import MaintainerList from './components/maintainerList/maintainerList.component';

class Home extends PureComponent {
  componentWillMount() {
    this.props.getMaintainers();
  }

  render() {
    return (
      <div className="home">
        <Helmet
          title="Homepage"
          meta={[
            { name: 'description', content: 'Homepage of Apptension React Boilerplate' },
          ]}
        />

        <h1>
          <FormattedMessage {...messages.welcome} />
        </h1>

        <MaintainerList items={this.props.maintainers} />
      </div>
    );
  }
}

Home.propTypes = {
  maintainers: PropTypes.object,
  getMaintainers: PropTypes.func.isRequired,
};

export default Home;
