import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function mapStateToProps(state) {
  return {
    locale: state.getIn(['locales', 'lang']),
    messages: state.getIn(['locales', 'messages']),
  };
}

export default connect(mapStateToProps)(IntlProvider);
