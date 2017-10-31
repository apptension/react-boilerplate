import 'babel-polyfill';
import 'isomorphic-fetch';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.config.includeStack = true;

global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
