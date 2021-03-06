'use strict';

const jwt = require('jsonwebtoken');

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (ctx.app.config.manage_jwt.enable) { // 启用 jwt 校验
      const authorization = ctx.request.get('authorization');
      const arr = authorization.split(' ');
      if (arr.length === 2) {
        const scheme = arr[0];
        const credentials = arr[1];
        if (/^Bearer$/i.test(scheme)) {
          const token = credentials;

          try {
            const decoded = jwt.verify(token, ctx.app.config.manage_jwt.secret);
            if (!decoded) {
              throw new Error();
            }

            ctx.request.user = decoded.data;

            await next();
            return;
          } catch (err) {
            if (err.status === 200) {
              ctx.status = err.status;

              const message = err.message;
              const err_code = err.err_code;

              ctx.body = {
                ... (message && { message }),
                err_code,
              };

              return;
            }
            
            if (err.name !== 'TokenExpiredError' && err.name !== 'JsonWebTokenError') {
              if (err.name === 'BadRequestError') {
                ctx.status = 400;
              } if (err.name === 'NotFoundError') {
                ctx.status = 404;
              } else {
                ctx.status = 500;
              }

              ctx.body = {
                message: err.message,
              };
            } else {
              ctx.status = 403;
              ctx.body = {
                message: 'token 无效',
              };
            }

            return;
          }
        }
      }

      ctx.status = 403;
      ctx.body = {
        message: 'token 格式不对',
      };
      return;
    }

    await next();
  };
};
