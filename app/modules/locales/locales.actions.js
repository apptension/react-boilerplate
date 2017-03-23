import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setLanguage: ['payload'],
}, {});

export const localesActions = Creators;
export const localesActionsTypes = Types;
