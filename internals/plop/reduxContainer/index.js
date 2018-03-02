const path = require('path');

const templatesPath = path.join(__dirname, 'templates');
const componentTemplatesPath = path.join(__dirname, '../reactComponent/templates');

module.exports = (plop) => {
  const containerDirectory = 'app/routes/{{ directory }}/{{ camelCase name }}';
  plop.setGenerator('container', {
    description: 'Generate a Redux container',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name:',
    }, {
      type: 'directory',
      name: 'directory',
      basePath: 'app/routes',
      message: 'Directory',
    }],
    actions: [{
      type: 'add',
      path: `${containerDirectory}/index.js`,
      templateFile: path.join(templatesPath, 'index.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.container.js`,
      templateFile: path.join(templatesPath, 'container.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.component.js`,
      templateFile: path.join(componentTemplatesPath, 'component.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/{{ camelCase name }}.styles.js`,
      templateFile: path.join(componentTemplatesPath, 'styles.hbs'),
    }, {
      type: 'add',
      path: `${containerDirectory}/__tests__/{{ camelCase name }}.component.spec.js`,
      templateFile: path.join(componentTemplatesPath, '__tests__/component.spec.hbs'),
    }],
  });
};
