'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;

  const subRouter = router.namespace('/api/v1');
  
  subRouter.get('/test', controller.v1.mytest.index);

  subRouter.resources('admin', '/manage/admin', controller.v1.admin);
  subRouter.post('admin', '/manage/admin/login', controller.v1.admin.login);
  subRouter.post('admin', '/manage/admin/update_password', app.middleware.manageJWTValidate(), controller.v1.admin.update_password);

  // 官网-新闻
  subRouter.get('site', '/manage/site/news', app.middleware.manageJWTValidate(), controller.v1.site.news_manage_list);
  subRouter.post('site', '/manage/site/news', app.middleware.manageJWTValidate(), controller.v1.site.news_create);
  subRouter.delete('site', '/manage/site/news/:id', app.middleware.manageJWTValidate(), controller.v1.site.news_delete);
  subRouter.get('site', '/manage/site/news/:id', app.middleware.manageJWTValidate(), controller.v1.site.news_get);
  subRouter.put('site', '/manage/site/news/:id', app.middleware.manageJWTValidate(), controller.v1.site.news_update);
  subRouter.get('site', '/site/news/:id', controller.v1.site.news_get_and_count_see_num);
  subRouter.get('site', '/site/news', controller.v1.site.news_list);
};
