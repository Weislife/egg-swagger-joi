'use strict';

const moment = require('moment');
const datetime = {};

datetime.format = function(dt) {
  return moment(dt).format('YYYY-MM-DD HH:mm:ss');
};

// 获取今天的日期
datetime.today_date = function() {
  return moment(Date.now()).format('YYYY-MM-DD');
};

module.exports = datetime;
