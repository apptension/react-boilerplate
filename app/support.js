require('es5-shim');
require('es5-shim/es5-sham');
//eslint-disable-next-line import/first
import UnsupportedBrowserDetection from './utils/unsupportedBrowserDetection';

const detection = new UnsupportedBrowserDetection();

window.onload = () => {
  document.documentElement.className += ` device-${detection.deviceType}`;

  if (detection.isInAppBrowser) {
    document.documentElement.className += ' in-app-browser';
  }

  if (!detection.isSupported()) {
    document.documentElement.className += ' unsupported';
  }
};
