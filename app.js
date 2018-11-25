'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // console.log(process.env);
    // console.log(app.config);

    const os_env = process.env;
    const my_config_keys_arr = Object.keys(app.config);
    Object.keys(os_env).forEach(function(item) {
      if (my_config_keys_arr.includes(item) && os_env[item]) {
        app.config[item] = os_env[item];
      }
    });
  });
};
