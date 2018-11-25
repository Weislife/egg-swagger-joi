'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  async create(obj) {
    const admin = await this.ctx.model.Admin.findOne({ username: obj.username });
    if (admin) {
      this.ctx.throw(500, 'business logic error', { message: '已经存在相同名称的管理员用户' });
    }

    obj = this.ctx.helper.setPassword(obj, obj.password);
    return await this.ctx.model.Admin.create(obj);
  }

  async get(id) {
    const admin = await this.ctx.model.Admin.findById(id);
    if (!admin) {
      this.ctx.throw(404);
    }

    return admin;
  }

  async getByUsername(username) {
    const admin = await this.ctx.model.Admin.findOne({ username });
    if (!admin) {
      return null;
    }

    return admin;
  }

  async update(id, obj) {
    const admin = await this.ctx.model.Admin.findById(id);
    if (!admin) {
      this.ctx.throw(404);
    }

    if (obj.username) {
      const admin_repeat = await this.ctx.model.Admin.findOne({
        username: obj.username,
        _id: { $ne: id },
      });
      if (admin_repeat) {
        this.ctx.throw(500, 'business logic error', { message: '已经存在相同名称的管理员用户' });
      }
    } else {
      delete obj.username;
    }

    if (obj.password) {
      obj = this.ctx.helper.setPassword(obj, obj.password);
    } else {
      delete obj.password;
    }

    admin.set(obj);
    return await admin.save();
  }

}

module.exports = AdminService;
