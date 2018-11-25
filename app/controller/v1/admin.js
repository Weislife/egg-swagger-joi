'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class AdminController extends Controller {

  async create() {
    this.ctx.throw(403);
      
    const obj = {
      username: this.ctx.request.body.username,
      password: this.ctx.request.body.password,
    };
    const admin = await this.ctx.service.admin.create(obj);
    this.ctx.body = { data: admin.toObject() };
  }

  async update_password() {
    const id = this.ctx.request.user.id;
    const obj = {
      password: this.ctx.request.body.password,
    };

    const admin = await this.ctx.service.admin.update(id, obj);
    this.ctx.body = { data: admin.toObject() };
  }

  async login() {
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    const admin = await this.ctx.service.admin.getByUsername(username);
    if (!admin) {
      this.ctx.throw(500, 'business logic error', { message: '该管理员用户不存在' });
    }

    if (!this.ctx.helper.validPassword(admin, password)) {
      this.ctx.throw(500, 'business logic error', { message: '密码不正确' });
    }

    // 签署1小时期限的token
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {
        id: admin.id,
        username: admin.username,
      },
    }, this.ctx.app.config.manage_jwt.secret);

    this.ctx.body = { data: { token } };
  }

}

module.exports = AdminController;
