import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './maintainersList.messages';
import Maintainer from '../maintainer/maintainer.component';


const MaintainerList = ({ items }) => (
  <div className="maintainer-list">
    <h2 className="maintainer-list__title">
      <FormattedMessage {...messages.title} />:
    </h2>

    <ul>
      {items.toArray().map((item, key) => (
        <Maintainer key={key} data={item} />
      ))}
    </ul>
  </div>
);

MaintainerList.propTypes = {
  items: PropTypes.object.isRequired,
};

export default MaintainerList;
