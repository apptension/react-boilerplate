import { expect } from 'chai';
import { spy } from 'sinon';
import UnsupportedBrowserDetection from '../unsupportedBrowserDetection';
/* eslint-disable max-len*/
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
const IE_UA = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';
const FB_UA = 'Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/28.0.0.20.16;]';
const CHROME_ANDROID_UA = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Mobile Safari/537.36';
const CHROME_TABLET_UA = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
/* eslint-enable max-len*/

function setUserAgent(userAgent) {
  navigator.__defineGetter__('userAgent', () => userAgent);
}

describe('Utils: UnsupportedBrowserDetection Class', () => {
  const config = {
    desktop: [{
      browser: 'firefox', minversion: 41,
    }, {
      browser: 'ie', versions: [11, 'edge'],
    }, {
      browser: 'chrome', minversion: 45,
    }, {
      browser: 'edge',
    }, {
      os: 'mac os', minos: '10.10.0', browser: 'safari', minversion: 8,
    }],
    tablet: [{
      os: 'ios', minos: '9', browser: 'mobile safari',
    }, {
      os: 'android', minos: '5.0', browser: 'chrome',
    }, {
      browser: 'ie', versions: [11, 'edge'],
    }, {
      browser: 'edge',
    }],
    mobile: [{
      os: 'ios', minos: '9', browser: 'mobile safari',
    }, {
      os: 'ios', minos: '5.0', browser: 'chrome',
    }, {
      os: 'android', minos: '5.0', browser: 'chrome', minversion: 50,
    }],
  };

  const component = ({ config, isInAppBrowserSupported }) => (
    new UnsupportedBrowserDetection(config, isInAppBrowserSupported)
  );

  beforeEach(() => {
    document.documentElement.className = '';
  });

  describe('isSupported()', () => {
    it('should return true for supported browser', () => {
      setUserAgent(CHROME_UA);

      const detector = component({ config });

      expect(detector.isSupported()).to.be.true;
    });

    it('should return false for unsupported browser', () => {
      setUserAgent(IE_UA);

      const detector = component({ config });

      expect(detector.isSupported()).to.be.false;
    });

    it('should return true when is in-app browser and isInAppBrowserSupported equals true', () => {
      setUserAgent(FB_UA);

      const detector = component({ config, isInAppBrowserSupported: true });

      expect(detector.isSupported()).to.be.true;
    });

    it('should return false when is in-app browser and isInAppBrowserSupported equals false', () => {
      setUserAgent(FB_UA);

      const detector = component({ config, isInAppBrowserSupported: false });

      expect(detector.isSupported()).to.be.false;
    });

    it('should add device-desktop class to html when device type equals desktop', () => {
      setUserAgent(CHROME_UA);

      const detector = component({ config });
      detector.check();

      expect(document.documentElement.className).to.have.string('device-desktop');
    });

    it('should add device-mobile class to html when device type equals mobile', () => {
      setUserAgent(CHROME_ANDROID_UA);

      const detector = component({ config });
      detector.check();

      expect(document.documentElement.className).to.have.string('device-mobile');
    });

    it('should add device-tablet class to html when device type equals tablet', () => {
      setUserAgent(CHROME_TABLET_UA);

      const detector = component({ config });
      detector.check();

      expect(document.documentElement.className).to.have.string('device-tablet');
    });

    it('should add unsupported class to html when browser is not supported', () => {
      setUserAgent(IE_UA);

      const detector = component({ config });
      detector.check();

      expect(document.documentElement.className).to.have.string('unsupported');
    });

    it('should add in-app-browser class to html when is in-app browser', () => {
      setUserAgent(FB_UA);

      const detector = component({ config });
      detector.check();

      expect(document.documentElement.className).to.have.string('in-app-browser');
    });
  });

  describe('check', () => {
    it('should run successCallback when browser is supported', () => {
      setUserAgent(CHROME_UA);
      const successCallback = spy();
      const failureCallback = spy();

      const detector = component({ config });
      detector.check(successCallback, failureCallback);

      expect(successCallback).to.have.been.called;
      expect(failureCallback).not.to.have.been.called;
    });

    it('should run failureCallback when browser is not supported', () => {
      setUserAgent(IE_UA);
      const successCallback = spy();
      const failureCallback = spy();

      const detector = component({ config });
      detector.check(successCallback, failureCallback);

      expect(successCallback).not.to.have.been.called;
      expect(failureCallback).to.have.been.called;
    });
  });
});
