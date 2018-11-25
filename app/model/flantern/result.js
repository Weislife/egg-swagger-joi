'use strict';
/* 花灯打捞结果 */

const datetime = require('../../../util/datetime');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FLanternSalvageSchema = new Schema({
    salvage_user_id: { type: Number }, // 打捞花灯的用户的 user_id
    flantern_owner_user_id: { type: Number }, // 花灯所有者的 user_id
    salvage_mobile: { type: String }, // 打捞花灯用户的手机号
    flantern_owner_mobile: { type: String }, // 花灯所有者用户手机号
    flantern_gesture: { type: Number, enum: [ 1, 2, 3 ] }, // 花灯上的手势 1:石头 2:剪刀 3:布
    salvage_gesture: { type: Number, enum: [ 1, 2, 3 ] }, // 用户打捞时的手势 1:石头 2:剪刀 3:布
    game_result: { type: Number, enum: [ 1, 2, 3 ] }, // 1输 2平 3赢
    cost_swc: { type: Number, default: 0 }, // 花费 swc
    get_swc: { type: Number, default: 0 }, // 获得 swc
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

  FLanternSalvageSchema.virtual('id').get(function() {
    return this._id.toString();
  });

  FLanternSalvageSchema.set('toObject', { getters: true, virtuals: true });

  return mongoose.model('FLanternSalvage', FLanternSalvageSchema);
};
