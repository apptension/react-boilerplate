import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Home from './home.component';
import { maintainersActions } from '../../modules/maintainers/maintainers.actions';
import { localesActions } from '../../modules/locales/locales.actions';
import { selectMaintainersList } from '../../modules/maintainers/maintainers.selectors';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  maintainers: selectMaintainersList,
  language: selectLocalesLanguage,
});

export default connect(mapStateToProps, {
  getMaintainers: maintainersActions.getMaintainers,
  setLanguage: localesActions.setLanguage,
})(Home);
