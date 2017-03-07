import { createSelector } from 'reselect';


const selectMaintainersDomain = () => (state) => state.get('maintainers');

export const selectMaintainersList = () => createSelector(
  selectMaintainersDomain(),
  (state) => state.get('list')
);
