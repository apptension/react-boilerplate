import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './home.messages';

const Home = () => (
  <div className="home">
    <Helmet
      title="Homepage"
      meta={[
        { name: 'description', content: 'Homepage of Apptension React Boilerplate' },
      ]}
    />

    <FormattedMessage {...messages.welcome} />
  </div>
);

export default Home;
