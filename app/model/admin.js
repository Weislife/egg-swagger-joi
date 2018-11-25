'use strict';

const datetime = require('../../util/datetime');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    username: { type: String }, // 用户名
    password: { type: String }, // 密码
    salt: { type: String }, // 盐值
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

  AdminSchema.virtual('id').get(function() {
    return this._id.toString();
  });

  AdminSchema.set('toObject', { getters: true, virtuals: true });

  return mongoose.model('Admin', AdminSchema);
};
