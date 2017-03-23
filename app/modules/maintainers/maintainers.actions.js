import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getMaintainers: ['payload'],
  getMaintainersSuccess: ['payload'],
  getMaintainersError: ['payload'],
}, {});

export const maintainersActions = Creators;
export const maintainersActionsTypes = Types;

