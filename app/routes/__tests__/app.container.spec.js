import { expect } from 'chai';
import { spy } from 'sinon';

import { mapDispatchToProps } from '../app.container';
import { LocalesActions } from '../../modules/locales/locales.redux';


describe('App: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should call LocalesActions.setLanguage', () => {
      const dispatch = spy();

      mapDispatchToProps(dispatch).setLanguage();

      expect(dispatch.firstCall.args[0]).to.deep.equal(LocalesActions.setLanguage());
    });
  });
});
