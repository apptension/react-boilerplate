import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import { Container } from './notFound.styles';

export class NotFound extends PureComponent {
  render() {
    return (
      <Container>
        <Helmet
          title="Not Found"
        />

        <h1>404</h1>
      </Container>
    );
  }
}
