'use strict';

const OSS = require('ali-oss');
const STS = OSS.STS;

const Controller = require('egg').Controller;

class aliOSSController extends Controller {

  async get_token() {
    const ali_oss_config = this.ctx.app.config.ali_oss;
    const sts = new STS({
      accessKeyId: ali_oss_config.accessKeyId,
      accessKeySecret: ali_oss_config.accessKeySecret,
    });

    const token = await sts.assumeRole(ali_oss_config.role,
      ali_oss_config.policy, 15 * 60, 'oss-session');
    const region = ali_oss_config.region;
    const accessKeyId = token.credentials.AccessKeyId;
    const accessKeySecret = token.credentials.AccessKeySecret;
    const stsToken = token.credentials.SecurityToken;
    const bucket = ali_oss_config.bucket;
    this.ctx.body = { data: { region, accessKeyId, accessKeySecret, stsToken, bucket } };
  }

}

module.exports = aliOSSController;
