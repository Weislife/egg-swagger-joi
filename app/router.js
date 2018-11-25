'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/v1')(app);
  require('./router/common')(app);
};

