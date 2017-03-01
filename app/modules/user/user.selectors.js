import { createSelector } from 'reselect';


const selectUserDomain = () => (state) => state.get('user');

export const selectUserData = () => createSelector(
  selectUserDomain(),
  (state) => state.get('data')
);
