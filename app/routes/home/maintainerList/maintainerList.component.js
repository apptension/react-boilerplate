import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './maintainersList.messages';
import { Container, Title, List, ListItem } from './maintainerList.styles';

export class MaintainerList extends PureComponent {
  static propTypes = {
    items: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>

        <List>
          {this.props.items.toArray().map((item, key) => (
            <ListItem key={key}>
              <a href={`mailto:${item.get('email')}`}>
                {item.get('firstName')} {item.get('lastName')}
              </a>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}
