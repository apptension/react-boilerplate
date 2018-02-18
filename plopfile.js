module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Generate a Redux module',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Module name:',
    }],
    actions: [{
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/index.js',
      templateFile: 'internals/plopTemplates/module/index.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.redux.js',
      templateFile: 'internals/plopTemplates/module/redux.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.sagas.js',
      templateFile: 'internals/plopTemplates/module/sagas.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/{{ camelCase name }}.selectors.js',
      templateFile: 'internals/plopTemplates/module/selectors.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.redux.spec.js',
      templateFile: 'internals/plopTemplates/module/__tests__/redux.spec.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.sagas.spec.js',
      templateFile: 'internals/plopTemplates/module/__tests__/sagas.spec.hbs',
    }, {
      type: 'add',
      path: 'app/modules/{{ camelCase name }}/__tests__/{{ camelCase name }}.selectors.spec.js',
      templateFile: 'internals/plopTemplates/module/__tests__/selectors.spec.hbs',
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
