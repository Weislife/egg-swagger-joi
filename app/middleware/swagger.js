'use strict';

const { toSwaggerDoc, ui } = require('koa-joi-swagger');
const mixedDoc = require('../../swagger/mixedDoc');
const swaggerDoc = toSwaggerDoc(mixedDoc);
const swaggerConfig = {
  docExpansion: 'none',
  jsonEditor: true,
};

/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "app" }]*/
module.exports = (options, app) => {
  if (app.config.swagger.enable) {
    return ui(swaggerDoc, {
      pathRoot: options.pathRoot, // optional, swagger path
      skipPaths: [], // optional, skip paths
      // UIHtml: defaultUIHtml, // optional, get ui html
      swaggerConfig: JSON.stringify(swaggerConfig), // optional, a json5 string, e.g. `{ <field>: <value>, .... }` to display in html for overriding swagger ui options.
      sendConfig: { maxage: 3600 * 1000 * 24 * 30 }, // optional, config for koa-send, default maxage is 1 month.
      v3: true, // optional, default is v2, you need to install optional dependencies `swagger-ui-dist` first.
    });
  }

  return async (ctx, next) => {
    await next();
  };
};
