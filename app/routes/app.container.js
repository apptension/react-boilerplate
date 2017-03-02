import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import App from './app.component';


const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, {})(App);
