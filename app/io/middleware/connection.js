'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = app => {
  return async (ctx, next) => {
    if (ctx.app.config.env === 'local') { // 本地开发环境
      ctx.logger.info('socket io connect info: ', ctx.socket.handshake);
    }

    await next();
    // execute when disconnect.

    if (ctx.app.config.env === 'local') { // 本地开发环境
      ctx.logger.info('socket io disconnect ip: ', ctx.socket.handshake.address);
    }
  };
};
