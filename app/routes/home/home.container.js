import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Home from './home.component';
import { getMaintainers } from '../../modules/maintainers/maintainers.actions';
import { setLanguage } from '../../modules/locales/locales.actions';
import { selectMaintainersData } from '../../modules/maintainers/maintainters.selectors';
import { selectLocalesLanguage } from '../../modules/locales/locales.selectors';

const mapStateToProps = createStructuredSelector({
  maintainers: selectMaintainersData(),
  language: selectLocalesLanguage(),
});

export default connect(mapStateToProps, {
  getMaintainers,
  setLanguage,
})(Home);
