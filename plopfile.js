const promptDirectory = require('inquirer-directory');

const addReduxModuleGenerator = require('./internals/plop/reduxModule');
const addReduxContainerGenerator = require('./internals/plop/reduxContainer');
const addReactComponentGenerator = require('./internals/plop/reactComponent');

module.exports = function (plop) {
  plop.setPrompt('directory', promptDirectory);

  addReduxModuleGenerator(plop);
  addReduxContainerGenerator(plop);
  addReactComponentGenerator(plop);
};
