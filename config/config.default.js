'use strict';

module.exports = appInfo => {

  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529910741859_8987';

  config.cluster = {
    listen: {
      port: 7113,
    },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://user:user123456@192.168.8.53:27119/game-platform',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 1000, // Reconnect every 1000ms
      },
    },
  };

  config.io = {
    init: { },
    namespace: {
      '/flantern/barrage': {
        connectionMiddleware: [ 'connection' ],
        packetMiddleware: [],
      },
    },
  };

  config.manage_jwt = {
    enable: true,
    secret: '',
  };

  // 阿里云 OSS 配置
  config.ali_oss = {
    accessKeyId: '',
    accessKeySecret: '',
    role: 'acs:ram::1430031715800738:role/admin-test-shareworld-pro-role',
    region: 'oss-cn-shenzhen',
    bucket: 'test-admin-shareworld-pro',
    policy: {
      Version: '1',
      Statement: [
        {
          Effect: 'Allow',
          Action: [
            'oss:*',
          ],
          Resource: [
            'acs:oss:*:*:test-admin-shareworld-pro',
            'acs:oss:*:*:test-admin-shareworld-pro/*',
          ],
          Condition: {},
        },
      ],
    },
  };

  // add your config here
  config.middleware = [ 'cors', 'timeAccess', 'handleErrors', 'mongooseLogger', 'printRequest', 'swagger', 'mixedValidate' ];

  config.security = {
    csrf: {
      enable: false,
    },
    methodnoallow: {
      enable: false,
    },
  };

  config.swagger = {
    enable: true,
    pathRoot: '/swagger',
  };

  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };

  config.timeAccess = { enable: true, key: 'Cost Time: ' };

  config.development = {
    watchDirs: [ 'swagger', 'util' ],
  };

  return config;
};
