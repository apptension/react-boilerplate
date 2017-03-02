import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Home from './home.component';
import { getMaintainers } from '../../modules/maintainers/maintainers.actions';
import { selectMaintainersData } from '../../modules/maintainers/maintainters.selectors';

const mapStateToProps = createStructuredSelector({
  maintainers: selectMaintainersData(),
});

export default connect(mapStateToProps, {
  getMaintainers,
})(Home);
