'use strict';

const crypt = require('crypto');

module.exports = {

  setPassword(user, password) {
    user.salt = crypt.randomBytes(16).toString('hex');
    user.password = crypt.pbkdf2Sync(password, user.salt, 1000, 64, 'sha1').toString('hex');
    return user;
  },

  validPassword(user, password) {
    const hash = crypt.pbkdf2Sync(password, user.salt, 1000, 64, 'sha1').toString('hex');
    return user.password === hash;
  },

};
