import { expect } from 'chai';

import {
  maintainersActions,
  maintainersActionsTypes,
} from '../maintainers.actions';


describe('Maintainers: actions', () => {
  describe('getMaintainers', () => {
    it('should return correct type', () => {
      expect(maintainersActions.getMaintainers().type).to.equal(maintainersActionsTypes.GET_MAINTAINERS);
    });

    it('should return proper payload', () => {
      const language = 'en';
      expect(maintainersActions.getMaintainers(language).payload).to.deep.equal(language);
    });
  });

  describe('getMaintainersSuccess', () => {
    it('should return correct type', () => {
      expect(maintainersActions.getMaintainersSuccess().type).to.equal(maintainersActionsTypes.GET_MAINTAINERS_SUCCESS);
    });

    it('should return proper payload', () => {
      const data = { key: 'value' };
      expect(maintainersActions.getMaintainersSuccess(data).payload).to.be.equal(data);
    });
  });

  describe('getMaintainersError', () => {
    it('should return correct type', () => {
      expect(maintainersActions.getMaintainersError().type).to.equal(maintainersActionsTypes.GET_MAINTAINERS_ERROR);
    });

    it('should return proper payload', () => {
      const error = { prop: 'value' };
      expect(maintainersActions.getMaintainersError(error).payload).to.equal(error);
    });
  });
});
