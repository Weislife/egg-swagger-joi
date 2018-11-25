'use strict';

module.exports = function(Joi) {
  return {
    tag: { name: 'Admin', description: '管理员' },
    paths: {
      '/v1/manage/admin': {
        post: {
          summary: '创建管理员用户',
          tags: [ 'Admin' ],
          deprecated: true,
          parameters: {
            body: Joi.object().keys({
              username: Joi.string().required().description('用户名'),
              password: Joi.string().min(6).required().description('密码'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({
                  id: Joi.string().mongodbId().required().description('id'),
                  username: Joi.string().required().description('用户名'),
                  create_time: Joi.string().required().description('创建时间'),
                  update_time: Joi.string().required().description('修改时间'),
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
      '/v1/manage/admin/login': {
        post: {
          summary: '管理员用户登录',
          tags: [ 'Admin' ],
          parameters: {
            body: Joi.object().keys({
              username: Joi.string().required().description('用户名'),
              password: Joi.string().min(6).required().description('密码'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({
                  token: Joi.string().required().description('token'),
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
      '/v1/manage/admin/update_password': {
        post: {
          summary: '管理员用户修改密码',
          tags: [ 'Admin' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            body: Joi.object().keys({
              password: Joi.string().min(6).required().description('密码'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
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
};
