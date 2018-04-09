import { injectGlobal } from 'styled-components';

// eslint-disable-next-line
injectGlobal`
  #app {
    text-align: center;
  }
  html.unsupported {
    .unsupported-page {
      display: block !important;
    }
  
    #app {
      display: none;
    }
  }
`;
