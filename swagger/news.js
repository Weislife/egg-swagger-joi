'use strict';

module.exports = function(Joi) {
  return {
    tag: { name: 'Site', description: '官网管理' },
    paths: {
      '/v1/manage/site/news': {
        get: {
          summary: '新闻列表(后台)',
          tags: [ 'Site' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            query: Joi.object().keys({
              page_number: Joi.number().integer().greater(0).required().description('第几页'),
              page_size: Joi.number().integer().greater(0).required().description('每页展示数据数目'),
              title: Joi.string().empty('').optional().description('标题'),
              category: Joi.number().integer().valid(1, 2, 3, 4, 5).allow('', 'all').required().description('分类 all表示所有 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
              is_focus: Joi.boolean().allow('', 'all').required().description('是否重点新闻 all表示所有 true 重点新闻 false 非重点新闻'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({}).unknown({ allow: true }),
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
        post: {
          summary: '添加新闻(后台)',
          tags: [ 'Site' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            body: Joi.object().keys({
              title: Joi.string().required().description('新闻标题'),
              description: Joi.string().required().description('描述'),
              category: Joi.number().integer().valid(1, 2, 3, 4, 5).required().description('分类 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
              is_focus: Joi.boolean().required().description('是否重点新闻 true 重点新闻 false 非重点新闻'),
              news_img_url: Joi.string().required().description('新闻宣传图'),
              content: Joi.string().required().description('新闻内容'),
              sort_id: Joi.number().integer().greater(-1).required().description('排序id，数值越大排序越靠前'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({}).unknown({ allow: true }),
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
      '/v1/manage/site/news/{id}': {
        get: {
          summary: '获取新闻信息(后台)',
          tags: [ 'Site' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            pathParams: Joi.object().keys({
              id: Joi.string().mongodbId().required().description('id'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({}).unknown({ allow: true }),
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
        put: {
          summary: '更新新闻(后台)',
          tags: [ 'Site' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            pathParams: Joi.object().keys({
              id: Joi.string().mongodbId().required().description('id'),
            }),
            body: Joi.object().keys({
              title: Joi.string().required().description('新闻标题'),
              description: Joi.string().required().description('描述'),
              category: Joi.number().integer().valid(1, 2, 3, 4, 5).required().description('分类 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
              is_focus: Joi.boolean().required().description('是否重点新闻 true 重点新闻 false 非重点新闻'),
              news_img_url: Joi.string().required().description('新闻宣传图'),
              content: Joi.string().required().description('新闻内容'),
              sort_id: Joi.number().integer().greater(-1).required().description('排序id，数值越大排序越靠前'),
              state: Joi.number().valid(0, 1, 2, 3).required().description('1 待上架, 2 上架, 3 下架'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({}).unknown({ allow: true }),
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
        delete: {
          summary: '删除新闻(后台)',
          tags: [ 'Site' ],
          parameters: {
            headers: Joi.object().keys({
              authorization: Joi.string().required().description('Bearer + 空格 + token'),
            }).unknown({ allow: true }),
            pathParams: Joi.object().keys({
              id: Joi.string().mongodbId().required().description('id'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({}).unknown({ allow: true }),
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
      '/v1/site/news/{id}': {
        get: {
          summary: '获取新闻内容(客户端)',
          tags: [ 'Site' ],
          parameters: {
            pathParams: Joi.object().keys({
              id: Joi.string().mongodbId().required().description('id'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({
                  title: Joi.string().required().description('新闻标题'),
                  description: Joi.string().required().description('描述'),
                  category: Joi.number().integer().valid(1, 2, 3, 4, 5).required().description('分类 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
                  is_focus: Joi.boolean().required().description('是否重点新闻 true 重点新闻 false 非重点新闻'),
                  news_img_url: Joi.string().required().description('新闻宣传图'),
                  content: Joi.string().required().description('新闻内容'),
                  create_time: Joi.string().required().description('创建时间'),
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
      '/v1/site/news': {
        get: {
          summary: '新闻列表(客户端)',
          tags: [ 'Site' ],
          parameters: {
            query: Joi.object().keys({
              page_number: Joi.number().integer().greater(0).required().description('第几页'),
              page_size: Joi.number().integer().greater(0).required().description('每页展示数据数目'),
              category: Joi.number().integer().valid(0, 1, 2, 3, 4, 5).required().description('分类 0所有 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
              is_focus: Joi.boolean().valid('', true, false).optional().description('是否重点新闻 空字符串为所有 true 重点新闻 false 非重点新闻'),
            }),
          },
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object().keys({
                data: Joi.object().keys({
                  page_number: Joi.number().integer().greater(0).required().description('第几页'),
                  page_size: Joi.number().integer().greater(0).required().description('每页展示数据数目'),
                  count: Joi.number().integer().required().description('总数目'),
                  list: Joi.array().items(Joi.object().keys({
                    id: Joi.string().mongodbId().required().description('id'),
                    title: Joi.string().required().description('新闻标题'),
                    description: Joi.string().required().description('描述'),
                    category: Joi.number().integer().valid(1, 2, 3, 4, 5).required().description('分类 1游戏产品；2科普知识；3行业新闻；4合作；5其他'),
                    is_focus: Joi.boolean().required().description('是否重点新闻 true 重点新闻 false 非重点新闻'),
                    news_img_url: Joi.string().required().description('新闻宣传图'),
                    create_time: Joi.string().required().description('创建时间'),
                  })),
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
    },
  };
};
