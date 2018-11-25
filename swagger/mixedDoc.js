'use strict';

let Joi = require('joi');
const fs = require('fs');
const path = require('path');
const { toSwaggerDoc } = require('koa-joi-swagger');

const mongoose = require('mongoose');
Joi = Joi.extend(joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    mongodbId: 'is not a valid mongodb Id',
  },
  rules: [
    {
      name: 'mongodbId',
      validate(params, value, state, options) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          // Generate an error, state and options need to be passed
          return this.createError('string.mongodbId', {}, state, options);
        }

        return value; // Everything is OK
      },
    },
  ],
}));

const mixedDoc = {
  swagger: '2.0',
  info: {
    title: '接口文档',
    description: '',
    version: '1.0.0',
  },
  //  array of all schemes that your API supports
  schemes: [ 'http' ],
  //  will be prefixed to all paths
  basePath: '/api',
  consumes: [ 'application/x-www-form-urlencoded' ],
  produces: [ 'application/json' ],
  tags: [{ name: 'Common', description: '通用接口' }],
  paths: {
    '/common/ali_oss/get_token': {
      get: {
        summary: '获取阿里云 OSS token',
        tags: [ 'Common' ],
        parameters: {
          headers: Joi.object().keys({
            authorization: Joi.string().required().description('Bearer + 空格 + token'),
          }).unknown({ allow: true }),
        },
        responses: {
          200: {
            description: 'Success',
            schema: Joi.object().keys({
              data: Joi.object().keys({
                region: Joi.string().required().description('region'),
                accessKeyId: Joi.string().required().description('accessKeyId'),
                accessKeySecret: Joi.string().required().description('accessKeySecret'),
                stsToken: Joi.string().required().description('stsToken'),
                bucket: Joi.string().required().description('bucket'),
              }),
            }),
          },
          default: {
            description: 'Error happened',
            schema: Joi.object().keys({
              message: Joi.string(),
            }),
          },
        },
      },
    },
    '/v1/manage/other_api_config': {
      get: {
        summary: '获取 other api config',
        tags: [ 'OTHER_API_CONFIG' ],
        parameters: {
          headers: Joi.object().keys({
            authorization: Joi.string().required().description('Bearer + 空格 + token'),
          }).unknown({ allow: true }),
        },
        responses: {
          200: {
            description: 'Success',
            schema: Joi.object().keys({
              data: Joi.object().keys({
              }).unknown({ allow: true }),
            }),
          },
          default: {
            description: 'Error happened',
            schema: Joi.object().keys({
              message: Joi.string(),
            }),
          },
        },
      },
    },
  },
};

const filename_arr = fs.readdirSync(__dirname);
filename_arr.forEach(function(filename) {
  if (filename !== 'mixedDoc.js') {
    const func = require(__dirname + path.sep + filename);
    const obj = func(Joi);
    mixedDoc.tags.push(obj.tag);
    mixedDoc.paths = Object.assign(mixedDoc.paths, obj.paths);
  }
});

const swaggerDoc = toSwaggerDoc(mixedDoc);
fs.writeFileSync('./run/swagger-doc-from-mixed-doc.json', JSON.stringify(swaggerDoc, null, 2));

module.exports = mixedDoc;
