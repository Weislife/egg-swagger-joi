'use strict';
const datetime = require('../../util/datetime');

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (ctx.app.config.env === 'local') { // 本地开发环境
      console.log(datetime.format(new Date()) + ': ' + JSON.stringify(ctx.request, null, 2));
    }

    await next();

    if (ctx.app.config.env === 'local') { // 本地开发环境
      console.log(datetime.format(new Date()) + ': ' + JSON.stringify(Object.assign({}, JSON.parse(JSON.stringify(ctx.response)), { body: ctx.response.body }), null, 2));
    }
  };
};

