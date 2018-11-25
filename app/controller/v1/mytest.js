'use strict';

const Controller = require('egg').Controller;

class MyTestController extends Controller {
  async index() {
    this.ctx.body = { data: 'hi, egg' };
  }
}

module.exports = MyTestController;
