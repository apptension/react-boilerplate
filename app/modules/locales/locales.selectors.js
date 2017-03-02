import { createSelector } from 'reselect';


const selectLocalesDomain = () => (state) => state.get('locales');

export const selectLocalesLang = () => createSelector(
  selectLocalesDomain(),
  (state) => state.get('lang')
);
