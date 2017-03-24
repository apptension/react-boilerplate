import { createSelector } from 'reselect';


const selectMaintainersDomain = state => state.get('maintainers');

export const selectMaintainersItems = createSelector(
  selectMaintainersDomain, state => state.get('items')
);
