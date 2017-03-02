import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Home from './home.component';


const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, {})(Home);
