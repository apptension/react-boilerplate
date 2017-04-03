import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectLocalesLanguage } from '../locales.selectors';

describe('Locales: selectors', () => {
  const language = 'en';

  const mockedState = fromJS({
    locales: {
      language,
    },
  });

  describe('selectLocalesLanguage', () => {
    it('should select language', () => {
      expect(selectLocalesLanguage(mockedState)).to.equal(language);
    });
  });
});
