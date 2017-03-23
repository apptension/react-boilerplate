import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import App from './app.component';
import { selectLocalesLanguage } from '../modules/locales/locales.selectors';
import { localesActions } from '../modules/locales/locales.actions';


const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
});

export default connect(mapStateToProps, {
  setLanguage: localesActions.setLanguage,
})(App);
