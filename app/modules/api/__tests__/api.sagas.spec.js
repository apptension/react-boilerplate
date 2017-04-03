import { call } from 'redux-saga/effects';
import { expect } from 'chai';
import { spy } from 'sinon';

import {
  get,
  post,
  requestSaga,
  parseJSON,
} from '../api.sagas';


describe('Api: sagas', () => {
  describe('parseJSON', () => {
    it('should parse response object to json', () => {
      const response = { json: spy() };
      parseJSON(response);

      expect(response.json.calledOnce).to.be.true;
    });
  });

  describe('requestSaga', () => {
    it('should set proper options', () => {
      const requestGenerator = requestSaga('www.domain.com', { optionKey: 'optionValue' });

      expect(requestGenerator.next().value)
        .to.deep.equal(call(fetch, 'www.domain.com', {
          optionKey: 'optionValue',
          headers: { 'Content-Type': 'application/json' },
        }
      ));
    });

    it('should parse response', () => {
      const requestGenerator = requestSaga('www.domain.com', { optionKey: 'optionValue' });
      const request = Promise.resolve();

      requestGenerator.next();

      expect(requestGenerator.next(request).value)
        .to.deep.equal(call(parseJSON, request));
    });

    it('should parse error on exception', () => {
      const requestGenerator = requestSaga('www.domain.com', { optionKey: 'optionValue' });
      const error = new Error('error');

      requestGenerator.next();

      expect(requestGenerator.throw(error).value)
        .to.deep.equal(call(parseJSON, error));
    });
  });

  describe('get', () => {
    it('should call requestSaga with proper params', () => {
      const postGenerator = get('www.domain.com', { bodyKey: 'bodyValue' }, { optionKey: 'optionValue' });

      expect(postGenerator.next().value)
        .to.deep.equal(call(requestSaga, 'www.domain.com?bodyKey=bodyValue', {
          method: 'GET',
          optionKey: 'optionValue',
        }
      ));

      expect(postGenerator.next().done).to.equal(true);
    });
  });

  describe('post', () => {
    it('should call requestSaga with proper params', () => {
      const postGenerator = post('www.domain.com', { bodyKey: 'bodyValue' }, { optionKey: 'optionValue' });

      expect(postGenerator.next().value)
        .to.deep.equal(call(requestSaga, 'www.domain.com', {
          method: 'POST',
          body: { bodyKey: 'bodyValue' },
          optionKey: 'optionValue',
        }
      ));

      expect(postGenerator.next().done).to.equal(true);
    });
  });
});
