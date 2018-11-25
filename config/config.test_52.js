'use strict';
// 192.168.8.52 服务器

module.exports = () => {

  const config = {};

  config.timeAccess = { enable: true };

  config.swagger = {
    enable: true,
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

  config.logger = {
    disableConsoleAfterReady: false,
  };
  
  return config;
};
