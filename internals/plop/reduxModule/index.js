const path = require('path');

const templatesPath = path.join(__dirname, 'templates');

module.exports = (plop) => {
  plop.setGenerator('module', {
    description: 'Generate a Redux module',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name:',
    }],
    actions: [{
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/index.js',
      templateFile: path.join(templatesPath, 'index.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.redux.js',
      templateFile: path.join(templatesPath, 'redux.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.sagas.js',
      templateFile: path.join(templatesPath, 'sagas.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.selectors.js',
      templateFile: path.join(templatesPath, 'selectors.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.redux.spec.js',
      templateFile: path.join(templatesPath, '__tests__/redux.spec.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.sagas.spec.js',
      templateFile: path.join(templatesPath, '__tests__/sagas.spec.hbs'),
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.selectors.spec.js',
      templateFile: path.join(templatesPath, '__tests__/selectors.spec.hbs'),
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- IMPORT MODULE REDUCER -->)/g,
      template: 'import { reducer as {{ camelCase name }}Reducer } from \'./{{ camelCase name }}/{{ camelCase name }}.redux\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- INJECT MODULE REDUCER -->)/g,
      template: '{{ camelCase name }}: {{ camelCase name }}Reducer,\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- IMPORT MODULE SAGA -->)/g,
      template: 'import { watch{{ pascalCase name }} } from \'./{{ camelCase name }}/{{ camelCase name }}.sagas\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- INJECT MODULE SAGA -->)/g,
      template: 'fork(watch{{ pascalCase name }}),\n    $1',
    }],
  });
};
