import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';


const Home = () => (
  <div className="home">
    <Helmet
      title="Homepage"
      meta={[
        { name: 'description', content: 'Homepage of Apptension React Boilerplate' },
      ]}
    />

    <FormattedMessage id="home.welcomeMessage" />
  </div>
);

export default Home;
