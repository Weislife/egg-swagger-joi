'use strict';
const Service = require('egg').Service;
const pageQuery = require('../../../util/pageQuery');
const datetime = require('../../../util/datetime');
const utils = require('../../../util/utils');
const moment = require('moment');

class FLanternService extends Service {

  // 创建弹幕
  async create_barrage(obj) {
    /* const latest_arr = await this.ctx.model.Flantern.Barrage.find({ user_id: obj.user_id }).sort({ create_time: -1 }).limit(1);
    if (latest_arr.length !== 0) {
      const millseconds = new Date() - new Date(latest_arr[0].create_time);
      if ((millseconds / 1000) < 60) {
        this.ctx.throw(500, 'business logic error', { message: '每分钟只能发一条弹幕' });
      }
    }*/

    return await this.ctx.model.Flantern.Barrage.create(obj);
  }

  // 获取最近的弹幕
  async get_latest_barrage(num) {
    let arr = await this.ctx.model.Flantern.Barrage.find().sort({ create_time: -1 }).limit(num);
    arr = arr.map(item => item.toObject());
    return arr;
  }

  // 放花灯
  async create_flantern(obj) {
    return await this.ctx.model.Flantern.Flantern.create(obj);
  }

  // 随机捞一个花灯
  async salvage_flantern(user_id) {
    let arr = await this.ctx.model.Flantern.Flantern.aggregate([{ $match: { user_id: { $ne: user_id }, has_used: false } }, { $sample: { size: 1 } }]);
    arr = arr.map(item => {
      item.id = item._id;
      return item;
    });

    if (arr.length === 0) {
      return null;
    }

    return arr[0];
  }

  async create_record(obj) {
    return await this.ctx.model.Flantern.Record.create(obj);
  }

  // 统计剩余花灯的数目
  async get_flantern_num() {
    return await this.ctx.model.Flantern.Flantern.countDocuments({ has_used: false });
  }

  // 统计我的剩余花灯的数目
  async get_my_flantern_num(user_id) {
    return await this.ctx.model.Flantern.Flantern.countDocuments({ user_id, has_used: false });
  }

  // 获取活动记录
  async get_record_paging(page_number, page_size, user_id) {
    const obj = { user_id };

    return await pageQuery(page_number, page_size, this.ctx.model.Flantern.Record, '', obj, {
      create_time: 'desc',
    });
  }

  // 获取主界面的 30 个花灯
  async get_30_flantern(user_id) {
    let my_arr = await this.ctx.model.Flantern.Flantern.find({ user_id, has_used: false }).sort({ create_time: -1 }).limit(15);
    my_arr = my_arr.map(item => item.toObject());
    let other_arr = await this.ctx.model.Flantern.Flantern.aggregate([{ $match: { user_id: { $ne: user_id }, has_used: false } }, { $sample: { size: (30 - my_arr.length) } }]);
    other_arr = other_arr.map(item => {
      item.create_time = datetime.format(item.create_time);
      delete item._id;
      delete item.__v;
      return item;
    });
    return [ ...my_arr, ...other_arr ];
  }

  // 更新花灯状态
  async update_flantern_state(id) {
    const flantern = await this.ctx.model.Flantern.Flantern.findById(id);
    if (!flantern) {
      this.ctx.throw(404);
    }

    flantern.set({ has_used: true });
    return await flantern.save();
  }

  // 批量更新花灯状态
  async batch_update_flantern_state(id_arr) {
    await this.ctx.model.Flantern.Flantern.update({ _id: { $in: id_arr } }, { has_used: true }, { multi: true });
  }

  // 从平台转 swc 给用户
  async platform_send_swc_to_user(ctx, obj) {
    obj.app_id = ctx.app.config.app_id_and_secret_app_id_2;
    const swc = obj.swc;
    const secret_key = ctx.app.config.app_id_and_secret_secret_key_2;
    let request_data = {
      swc: swc.toFixed(4),
      nonce_str: new Date().getTime().toString(),
      timestamp: Math.round(Date.parse(new Date()) / 1000 - 10),
    };
    request_data = Object.assign({}, obj, request_data);
    const signature = utils.geneSignature(request_data, obj.app_id, secret_key);
    const resp_data = await ctx.curl(ctx.app.config.game_server_api_1 + '/v1/transfer/reward', {
      method: 'POST',
      contentType: 'json',
      data: Object.assign({}, request_data, { signature, swc }),
      dataType: 'json',
    });

    if (!resp_data || !resp_data.data || resp_data.data.err_code !== 0) {
      ctx.throw(500, 'business logic error', { message: resp_data.data.message || '从平台转 swc 给用户出错' });
    }
  }

  // 花灯打捞结果
  async salvage_flantern_result(obj) {
    return await this.ctx.model.Flantern.Result.create(obj);
  }

  // 放灯次数
  async get_create_flantern_num(start_time, end_time) {
    let obj = {};
    if (moment(start_time, 'YYYY-MM-DD HH:mm:ss', true).isValid() && moment(end_time, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      obj = { create_time: {
        $gt: new Date(start_time),
        $lt: new Date(end_time),
      } };
    }

    const num = await this.ctx.model.Flantern.Flantern.countDocuments(obj);
    return num;
  }

  // 放灯人数
  async get_create_flantern_people_num(start_time, end_time) {
    let obj = {};
    if (moment(start_time, 'YYYY-MM-DD HH:mm:ss', true).isValid() && moment(end_time, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      obj = { create_time: {
        $gt: new Date(start_time),
        $lt: new Date(end_time),
      } };
    }

    const data = await this.ctx.model.Flantern.Flantern.aggregate([
      { $match: obj },
      {
        $group: {
          _id: '$user_id',
        },
      },
    ]);

    return data.length;
  }


  // 捞灯次数
  async get_salvage_flantern_num(start_time, end_time) {
    let obj = {};
    if (moment(start_time, 'YYYY-MM-DD HH:mm:ss', true).isValid() && moment(end_time, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      obj = { create_time: {
        $gt: new Date(start_time),
        $lt: new Date(end_time),
      } };
    }

    const num = await this.ctx.model.Flantern.Result.countDocuments(obj);
    return num;
  }

  // 捞灯人数
  async get_salvage_flantern_people_num(start_time, end_time) {
    let obj = {};
    if (moment(start_time, 'YYYY-MM-DD HH:mm:ss', true).isValid() && moment(end_time, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      obj = { create_time: {
        $gt: new Date(start_time),
        $lt: new Date(end_time),
      } };
    }

    const data = await this.ctx.model.Flantern.Result.aggregate([
      { $match: obj },
      {
        $group: {
          _id: '$salvage_user_id',
        },
      },
    ]);

    return data.length;
  }
  
  // 捞灯输、赢、平的次数

}

module.exports = FLanternService;
