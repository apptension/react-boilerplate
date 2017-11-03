import UAParser from 'ua-parser-js';
import semverCompare from 'semver-compare';
import identity from 'lodash/identity';

export default class Detection {
  parser = new UAParser();

  supportedBrowsersConfig = {
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

  get isInAppBrowser() {
    return (
      (this.ua.indexOf('FBAN') > -1) ||
      (this.ua.indexOf('FBAV') > -1) ||
      (this.ua.indexOf('Twitter') > -1)
    );
  }

  get device() {
    return this.parser.getDevice();
  }

  get ua() {
    return this.parser.getUA();
  }

  get browser() {
    return this.parser.getBrowser();
  }

  get os() {
    return this.parser.getOS();
  }

  get deviceType() {
    const { type = 'desktop' } = this.device;
    return type;
  }

  compareVersions(a, b) {
    if (typeof a === 'string' || a instanceof String) {
      return semverCompare(a, b) <= 0;
    }

    return a <= parseInt(b, 10);
  }

  isSupported() {
    document.documentElement.className += ` device-${this.deviceType}`;

    if (this.isInAppBrowser) {
      document.documentElement.className += ' in-app-browser';
      return true;
    }

    const { version: browserVersion } = this.browser;

    const isSupported = !this.supportedBrowsersConfig[this.deviceType].every(options => {
      const checkedOptions = Object.keys(options).map(optionKey => {
        const value = options[optionKey];

        switch (optionKey) {
          case 'os':
            return value === this.os.name.toLowerCase();
          case 'minos':
            return this.compareVersions(value, this.os.version);
          case 'browser':
            return value === this.browser.name.toLowerCase();
          case 'minversion':
            return this.compareVersions(value, browserVersion);
          case 'versions':
            const v = isNaN(parseInt(browserVersion, 10))
              ? browserVersion.toLocaleLowerCase()
              : parseInt(browserVersion, 10);

            return value.indexOf(v) >= 0;
        }

        return true;
      });

      return checkedOptions.indexOf(false) !== -1;
    });

    if (!isSupported) {
      document.documentElement.className += ' unsupported';
    }

    return isSupported;
  }

  check = (successCallback = identity, failureCallback = identity) => {
    if (this.isSupported()) {
      successCallback();
    } else {
      failureCallback();
    }
  };
}
