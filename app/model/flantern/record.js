'use strict';
/* 活动记录 */

const datetime = require('../../../util/datetime');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FLanternRecordSchema = new Schema({
    user_id: { type: Number }, // user_id
    content: { type: String }, // 消息内容
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

  FLanternRecordSchema.virtual('id').get(function() {
    return this._id.toString();
  });

  FLanternRecordSchema.set('toObject', { getters: true, virtuals: true });

  return mongoose.model('FLanternRecord', FLanternRecordSchema);
};
