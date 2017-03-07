import 'babel-polyfill';
import { resolve, join } from 'path';
import assert from 'assert';
import Module from 'module';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { jsdom } from 'jsdom';


chai.use(chaiEnzyme());
chai.config.includeStack = true;

const aliases = {
  'env-config': join(process.cwd(), 'app/environment/test.js'),
};

Module.prototype.require = function require(path) {
  const types = /\.(s?css|sass|less|svg|html|png|jpe?g|gif|glsl)$/;
  if (path.search(types) !== -1) {
    return null;
  }

  const alias = aliases[path];
  if (alias) {
    path = resolve(alias);
  }

  assert(typeof path === 'string', 'path must be a string');
  assert(path, 'missing path');

  return Module._load(path, this); // eslint-disable-line no-underscore-dangle
};

global.__DEBUG__ = true; // eslint-disable-line no-underscore-dangle
global.document = jsdom('');
global.window = document.defaultView;
global.requestAnimationFrame = (func) => setTimeout(func);

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

global.fetch = () => {};
