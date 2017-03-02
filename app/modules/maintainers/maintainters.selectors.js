import { createSelector } from 'reselect';


const selectMaintainersDomain = () => (state) => state.get('maintainers');

export const selectMaintainersData = () => createSelector(
  selectMaintainersDomain(),
  (state) => state.get('data')
);
