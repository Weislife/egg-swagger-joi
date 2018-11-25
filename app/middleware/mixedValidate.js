'use strict';

const { mixedValidate } = require('koa-joi-swagger');
const mixedDoc = require('../../swagger/mixedDoc');

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
module.exports = (options, app) => {
  return mixedValidate(mixedDoc, {
    reqOpts: {
      stripUnknown: false,
      convert: true,
    }, // optional, ctx.request joi validation options, here is default
    resOpts: { // optional, ctx.response joi validation options, here is default
      stripUnknown: true, // this would remove additional properties
      convert: true, // this would convert field types
    },
    onError: err => console.error(err), // Do something with the error, the error would throw anyway.
  });
};
