import { spy } from 'sinon';
import { expect } from 'chai';
import { always } from 'ramda';

import {
  renderWhen,
  renderWhenNotNil,
  renderWhenTrue,
  renderWhenTrueOtherwise,
} from '../rendering';

describe('renderWhenNotNil: Function', () => {
  it('should call function argument, if condition argument is not null', () => {
    const condition = {};
    const fn = spy();
    renderWhenNotNil(fn)(condition);
    expect(fn).to.have.been.calledOnce;
  });

  it('should not return null, if condition argument is not null', () => {
    const condition = {};
    const fn = spy();
    expect(renderWhenNotNil(fn)(condition)).to.not.be.null;
  });

  it('should not call function argument, if condition argument is null', () => {
    const condition = null;
    const fn = spy();
    renderWhenNotNil(fn)(condition);
    expect(fn).to.have.not.been.called;
  });

  it('should return null if condition argument is null', () => {
    const condition = null;
    const fn = spy();
    expect(renderWhenNotNil(fn)(condition)).to.be.null;
  });
});


describe('renderWhenTrue: Function', () => {
  it('should call function argument, if condition argument is true', () => {
    const condition = true;
    const fn = spy();
    renderWhenTrue(fn)(condition);
    expect(fn).to.have.been.calledOnce;
  });

  it('should not return null, if condition argument is true', () => {
    const condition = true;
    const fn = spy();
    expect(renderWhenTrue(fn)(condition)).to.not.be.null;
  });

  it('should not call function argument, if condition argument is false', () => {
    const condition = false;
    const fn = spy();
    renderWhenTrue(fn)(condition);
    expect(fn).to.have.not.been.called;
  });

  it('should return null if condition argument is false', () => {
    const condition = false;
    const fn = spy();
    expect(renderWhenTrue(fn)(condition)).to.be.null;
  });
});

describe('renderWhen: Function', () => {
  it('should call function argument, if condition argument is true', () => {
    const condition = always(true);
    const fn = spy();
    renderWhen(condition, fn)();
    expect(fn).to.have.been.calledOnce;
  });

  it('should not return null, if condition argument is true', () => {
    const condition = always(true);
    const fn = spy();
    expect(renderWhen(condition, fn)()).to.not.be.null;
  });

  it('should not call function argument, if condition argument is false', () => {
    const condition = always(false);
    const fn = spy();
    renderWhen(condition, fn)();
    expect(fn).to.have.not.been.called;
  });

  it('should return null if condition argument is false', () => {
    const condition = always(false);
    const fn = spy();
    expect(renderWhen(condition, fn)()).to.be.null;
  });
});

describe('renderWhenTrueOtherwise: Function', () => {
  it('should call first function argument, if condition argument is true', () => {
    const condition = true;
    const fn1 = spy();
    const fn2 = spy();
    renderWhenTrueOtherwise(fn1, fn2)(condition);
    expect(fn1).to.have.been.calledOnce;
    expect(fn2).to.not.have.been.called;
  });

  it('should call second function argument, if condition argument is false', () => {
    const condition = false;
    const fn1 = spy();
    const fn2 = spy();
    renderWhenTrueOtherwise(fn1, fn2)(condition);
    expect(fn1).to.not.have.been.called;
    expect(fn2).to.have.been.calledOnce;
  });
});
