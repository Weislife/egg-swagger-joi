'use strict';
/* 生产环境*/

module.exports = () => {

  const config = {};

  config.timeAccess = { enable: false };

  config.swagger = {
    enable: false,
  };

  config.mongoose = {
    client: {
      url: 'mongodb://user:user123456@game_platform_mongodb:27017/game-platform',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 1000, // Reconnect every 1000ms
      },
    },
  };

  // 阿里云 OSS 配置
  config.ali_oss = {
    accessKeyId: '',
    accessKeySecret: '',
    role: 'acs:ram::1430031715800738:role/admin-shareworld-pro-role',
    region: 'oss-cn-shenzhen',
    bucket: 'admin-shareworld-pro',
    policy: {
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: [
            'oss:*',
          ],
          Resource: [
            'acs:oss:*:*:admin-shareworld-pro',
            'acs:oss:*:*:admin-shareworld-pro/*',
          ],
          Condition: {},
        },
      ],
    },
  };

  return config;
};
