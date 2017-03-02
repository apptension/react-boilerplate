import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';


const App = ({ children }) => (
  <div className="app">
    <Helmet
      titleTemplate="%s - Apptension React Boilerplate"
      defaultTitle="Apptension React Boilerplate"
      meta={[
        { name: 'description', content: 'Apptension React Boilerplate application' },
      ]}
    />

    {children}

  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
