'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('app/controller/v1/mytest.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /test', () => {
    return app.httpRequest()
      .get('/api/v1/test')
      .expect('{"code":200,"data":"hi, egg"}')
      .expect(200);
  });
});
