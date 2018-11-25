'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (ctx.app.config.env === 'local' && ctx.app.config.timeAccess.enable) { // 本地开发环境
      console.time(options.key);
    }

    await next();

    if (ctx.app.config.env === 'local' && ctx.app.config.timeAccess.enable) { // 本地开发环境
      console.timeEnd(options.key);
    }
  };
};
