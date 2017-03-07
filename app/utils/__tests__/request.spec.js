import { expect } from 'chai';
import { stub } from 'sinon';

import request from '../request';


describe('Utils: request', () => {
  it('should format successful response correctly', (done) => {
    const res = {
      json: () => ({ exampleKey: 'exampleValue' }),
      status: 200,
    };
    stub(global, 'fetch', () => Promise.resolve(res));

    request('/correct-url')
      .then((json) => {
        expect(json.exampleKey).to.be.equal('exampleValue');
        global.fetch.restore();
        done();
      });
  });
  it('should catch errors from not successful response', (done) => {
    const res = {
      status: 404,
      statusText: 'Not Found',
    };
    stub(global, 'fetch', () => Promise.resolve(res));

    request('/incorrect-url')
      .catch((err) => {
        expect(err.response.status).to.be.equal(404);
        expect(err.response.statusText).to.be.equal('Not Found');

        global.fetch.restore();
        done();
      });
  });
});
