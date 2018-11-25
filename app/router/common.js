'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const subRouter = router.namespace('/api/common');

  subRouter.get('/ali_oss/get_token', app.middleware.manageJWTValidate(), controller.common.aliOSS.get_token);
};
