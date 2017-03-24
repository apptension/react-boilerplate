import React, { PropTypes, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './maintainersList.messages';
import { Maintainer } from '../maintainer/maintainer.component';


export class MaintainerList extends PureComponent {
  static propTypes = {
    items: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="maintainer-list">
        <h2 className="maintainer-list__title">
          <FormattedMessage {...messages.title} />:
        </h2>

        <ul>
          {this.props.items.toArray().map((item, key) => (
            <Maintainer key={key} data={item} />
          ))}
        </ul>
      </div>
    );
  }
}
