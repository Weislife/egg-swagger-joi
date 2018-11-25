'use strict';

const datetime = require('../../../util/datetime');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SiteNewsSchema = new Schema({
    title: { type: String }, // 新闻标题
    description: { type: String }, // 描述
    category: { type: Number, enum: [ 1, 2, 3, 4, 5 ] }, // 分类 1游戏产品；2科普知识；3行业新闻；4合作；5其他
    is_focus: { type: Boolean, default: false }, // 是否重点新闻 true 重点新闻 false 非重点新闻
    news_img_url: { type: String }, // 新闻宣传图
    state: { type: Number, enum: [ 1, 2, 3 ], default: 1 }, // 1 待上架, 2 上架, 3 下架
    content: { type: String }, // 新闻内容
    see_num: { type: Number, default: 0 }, // 浏览次数
    sort_id: {// 排序id，数值越大排序越靠前
      type: Number,
      default: 0,
    },
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

  SiteNewsSchema.virtual('id').get(function() {
    return this._id.toString();
  });

  SiteNewsSchema.set('toObject', { getters: true, virtuals: true });

  return mongoose.model('SiteNews', SiteNewsSchema);
};
