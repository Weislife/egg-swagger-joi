'use strict';

module.exports = {
  get body() {
    const status = this.response.status;
    const data = this.response.body;

    if (this.request.path.indexOf('/api') === 0) {
      return Object.assign({ code: status }, data);
    }

    return data;
  },
};
