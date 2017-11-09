import 'babel-polyfill';
import 'isomorphic-fetch';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import chaiJestDiff from 'chai-jest-diff';

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.use(chaiJestDiff());
chai.config.includeStack = true;

global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

/**
 * This object overrides environment configuration
 */
jest.mock('local-env-config', () => ({
  localEnvConfigLoaded: true,
}));
