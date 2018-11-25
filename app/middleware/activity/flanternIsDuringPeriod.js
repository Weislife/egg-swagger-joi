'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    const time = new Date();
    if (time >= new Date('2018-10-10 11:00:00')) { // 活动结束
      ctx.status = 403;
      ctx.body = {
        message: '活动已经结束了',
      };
      return;
    }

    await next();
  };
};
