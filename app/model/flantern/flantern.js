'use strict';
/* 花灯 */

const datetime = require('../../../util/datetime');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FLanternSchema = new Schema({
    user_id: { type: Number }, // user_id
    mobile: { type: String }, // 用户手机号
    bless: { type: String }, // 祝福语
    gesture: { type: Number, enum: [ 1, 2, 3 ] }, // 手势 1:石头 2:剪刀 3:布
    cost: { type: Number, default: 0 }, // 花费
    has_used: { type: Boolean, default: false }, // 是否被捞过 false:没被捞过
    create_time: {// 创建时间
      type: Date,
      default: Date.now,
      get: datetime.format,
    },
    update_time: {// 修改时间
      type: Date,
      default: Date.now,
      get: datetime.format,
    },
  },
  {
    timestamps: { createdAt: 'create_time', updatedAt: 'update_time' },
  });

  FLanternSchema.virtual('id').get(function() {
    return this._id.toString();
  });

  FLanternSchema.set('toObject', { getters: true, virtuals: true });

  return mongoose.model('FLantern', FLanternSchema);
};
