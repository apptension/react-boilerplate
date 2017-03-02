import { createTypes } from 'reduxsauce';


export const ACTION_TYPES = createTypes(`
  GET
  GET_SUCCESS
  GET_FAIL
`, { prefix: 'MAINTAINERS_' });
