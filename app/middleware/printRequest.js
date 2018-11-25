'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (ctx.app.config.env === 'local') { // 本地开发环境
      console.log(JSON.stringify(ctx.request, null, 2));
    }

    await next();
  };
};
