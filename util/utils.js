'use strict';
const crypto = require('crypto');

exports.geneMd5 = function(str) {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
};

exports.sortObjectKeys = function(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};

exports.geneSignature = function(obj, app_id, secret_key) {
  obj.app_id = app_id;
  obj = this.sortObjectKeys(obj);
  const str = Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
  return this.geneMd5(str + '&' + secret_key);
};

exports.formatPhone = function(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};
