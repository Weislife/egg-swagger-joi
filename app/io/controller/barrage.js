'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');
const schema = Joi.object().keys({
  user_id: Joi.number().integer().greater(0).required().description('user_id'),
  content: Joi.string().max(15).required().description('弹幕内容'),
});

class BarrageController extends Controller {

  async create() {
    const data = this.ctx.args[0];
    const validate_res = Joi.validate(JSON.parse(data), schema);
    if (!validate_res.error) { // 验证通过
      await this.ctx.service.activity.flantern.create_barrage(JSON.parse(data));
      await this.ctx.socket.emit('create', { code: 1 });
      await this.app.io.of('/flantern/barrage').emit('broadcast', this.ctx.args[0]);
    } else {
      // 只发送给自己
      await this.ctx.socket.emit('create', { code: 0, message: validate_res.error.message });
    }
  }

}

module.exports = BarrageController;
