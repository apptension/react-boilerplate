import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import messages from './contant.messages';

export class ContactContainer extends PureComponent {
  render() {
    return (
      <FormattedMessage {...messages.contact} />
    );
  }
}

export default connect(null, null)(ContactContainer);
