'use strict';
// 花灯活动结束，清空花灯，退还swc

module.exports = {
  schedule: {
    interval: '10m', // 10 分钟 间隔
    type: 'worker',
  },
  async task(ctx) {
    const time = new Date();
    if (time >= new Date('2018-10-10 11:00:00')) { // 活动结束
      ctx.logger.info('花灯活动结束，清空花灯，退还swc');

      const arr = await ctx.model.Flantern.Flantern.aggregate([
        { $match: { has_used: false } },
        { $limit: 500 },
        {
          $group: {
            _id: { user_id: '$user_id', mobile: '$mobile' },
            sum_cost: { $sum: '$cost' },
            id_arr: { $push: '$_id' },
          },
        },
        { $project: { _id: 0, user_id: '$_id.user_id', mobile: '$_id.mobile', sum_cost: 1, id_arr: 1 } },
      ]);

      for (const item of arr) {
        // 平台退还 swc 给用户
        await ctx.service.activity.flantern.platform_send_swc_to_user(ctx, {
          account: '86' + item.mobile,
          swc: item.sum_cost,
        });

        // 批量更新花灯状态
        await ctx.service.activity.flantern.batch_update_flantern_state(item.id_arr);
      }
    }
  },
};
