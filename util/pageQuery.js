'use strict';

const async = require('async');

const pageQuery = function(page, pageSize, Model, populate, queryParams, sortParams) {
  const start = (page - 1) * pageSize;
  const $page = {
    page_number: page,
    page_size: pageSize,
  };
  return new Promise(function(resolve, reject) {
    async.parallel({
      count(done) { // 查询数量
        Model.countDocuments(queryParams, function(err, count) {
          done(err, count);
        });
      },
      records(done) { // 查询一页的记录
        Model.find(queryParams, {}, {}).skip(start).limit(pageSize).populate(populate)
          .sort(sortParams)
          .exec(function(err, doc) {
            done(err, doc);
          });
      },
    }, function(err, results) {
      if (err) {
        return reject(err);
      }

      $page.count = results.count;
      $page.list = [];
      results.records.forEach(function(item) {
        $page.list.push(item.toObject());
      });

      resolve($page);
    });
  });
};

module.exports = pageQuery;
