import { expect } from 'chai';
import localEnvConfig from 'local-env-config';

import buildConfig from '../buildConfig';

describe('Utils: buildConfig', () => {
  it('should override base config', () => {
    expect(buildConfig({
      configObject: {
        configProp: 'configValue',
      },
    })).to.deep.equal({
      ...localEnvConfig,
      configObject: {
        configProp: 'configValue',
      },
    });
  });
});
