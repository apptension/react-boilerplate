require('es5-shim');
require('es5-shim/es5-sham');
//eslint-disable-next-line import/first
import UnsupportedBrowserDetection from './utils/unsupportedBrowserDetection';

const detection = new UnsupportedBrowserDetection();

window.onload = () => {
  detection.check(() => {
    setTimeout(window.initApp);
  });
};
