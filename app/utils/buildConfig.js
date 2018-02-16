import defaultsDeep from 'lodash.defaultsdeep';
import localConfig from 'local-env-config';

import base from '../environment/__baseConfig__';

/**
 * Override configuration from app/environment/__baseConfig__.js with specified config object.
 * This is further overridden with configuration in app/environment/local.js file if it is present.
 * @param {Object} config
 */
export default config => defaultsDeep({}, localConfig, config, base);
