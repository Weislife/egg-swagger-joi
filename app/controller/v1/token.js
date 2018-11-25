'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class TokenController extends Controller {

  async get_token() {
    // 签署1小时期限的token
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {},
    }, this.ctx.app.config.jwt.secret);

    this.ctx.body = { data: { token } };
  }

}

module.exports = TokenController;
