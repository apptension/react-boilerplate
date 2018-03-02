const addReduxModuleGenerator = require('./internals/plop/reduxModule');

module.exports = function (plop) {
  addReduxModuleGenerator(plop);
};
