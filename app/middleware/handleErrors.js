'use strict';

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (!(err.name === 'ResponseValidationError' && ctx.request.path.indexOf('/api/v1/backend/download/dd_login') === 0)) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
      }

      if (err.name === 'RequestValidationError') {
        ctx.status = 400;
        ctx.body = {
          message: err.details[0].message.replace(/\"/gi, "'"),
        };
      } else if (err.name === 'ResponseValidationError') {
        if (ctx.request.path.indexOf('/api/v1/backend/download/dd_login') !== 0) {
          ctx.status = 500;
          ctx.body = {
            message: '返回数据格式不对, ' + err.details[0].message.replace(/\"/gi, "'"),
            data: err.data,
          };
        }
      } else {
        const status = err.status || 500;
        const error = err.message || 'Internal Server Error';
        // 从 error 对象上读出各个属性，设置到响应中
        const obj = { message: error };
        if (err.err_code) {
          obj.err_code = err.err_code;
        }
        ctx.body = obj;
        if (status === 422) {
          ctx.body.detail = err.errors;
        }
        ctx.status = status;
      }
    }
  };
};
