import { expect } from 'chai';

import {
  getMaintainers,
  getMaintainersSuccess,
  getMaintainersError,
} from '../maintainers.actions';
import { ACTION_TYPES } from '../maintainers.constants';


describe('Maintainers: actions', () => {
  describe('getMaintainers', () => {
    it('should return correct type', () => {
      expect(getMaintainers().type).to.equal(ACTION_TYPES.GET);
    });

    it('should return proper payload', () => {
      const language = 'en';
      expect(getMaintainers(language).payload).to.deep.equal({ language });
    });
  });

  describe('getMaintainersSuccess', () => {
    it('should return correct type', () => {
      expect(getMaintainersSuccess().type).to.equal(ACTION_TYPES.GET_SUCCESS);
    });

    it('should return proper payload', () => {
      const data = { key: 'value' };
      expect(getMaintainersSuccess(data).payload).to.be.equal(data);
    });
  });

  describe('getMaintainersError', () => {
    it('should return correct type', () => {
      expect(getMaintainersError().type).to.equal(ACTION_TYPES.GET_FAIL);
    });

    it('should return correct error', () => {
      expect(getMaintainersError().error).to.be.equal(true);
    });

    it('should return proper payload', () => {
      const error = { prop: 'value' };
      expect(getMaintainersError(error).payload).to.equal(error);
    });
  });
});
