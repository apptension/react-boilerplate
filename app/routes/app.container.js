import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { App } from './app.component';
import { selectLocalesLanguage } from '../modules/locales/locales.selectors';
import { LocalesActions } from '../modules/locales/locales.redux';


const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLanguage: LocalesActions.setLanguage,
}, dispatch);

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
