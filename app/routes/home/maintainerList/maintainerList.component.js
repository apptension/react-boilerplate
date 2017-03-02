import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './maintainersList.messages';
import Maintainer from '../maintainer/maintainer.component';


const MaintainerList = ({ items }) => (
  <ul className="maintainer-list">
    <h2>
      <FormattedMessage {...messages.welcome} />:
    </h2>

    {items.toArray().map((item, key) => (
      <Maintainer key={key} data={item} />
    ))}
  </ul>
);

MaintainerList.propTypes = {
  items: PropTypes.object.isRequired,
};

export default MaintainerList;
