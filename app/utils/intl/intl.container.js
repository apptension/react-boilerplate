import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Intl from './intl.component';
import { selectLocalesLang } from '../../modules/locales/locales.selectors';


const mapStateToProps = createStructuredSelector({
  locale: selectLocalesLang(),
});

export default connect(mapStateToProps)(Intl);
