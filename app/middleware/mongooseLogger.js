'use strict';

const plugin = require('../../config/plugin');

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (plugin.mongoose.enable && ctx.app.config.env === 'local') { // 本地开发环境
      ctx.app.mongoose.set('debug', true);
    }

    await next();
  };
};
