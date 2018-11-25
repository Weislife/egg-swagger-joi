'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {

  async news_create() {
    const obj = this.ctx.request.body;
    const news = await this.ctx.service.site.create_news(obj);
    this.ctx.body = { data: news.toObject() };
  }

  async news_manage_list() {
    const page_number = parseInt(this.ctx.query.page_number);
    const page_size = parseInt(this.ctx.query.page_size);
    const title = this.ctx.query.title || '';
    const category = this.ctx.query.category;
    const is_focus = this.ctx.query.is_focus;
    const data = await this.ctx.service.site.news_manage_list(page_number, page_size, title, category, is_focus);
    this.ctx.body = { data };
  }

  async news_delete() {
    const id = this.ctx.params.id;
    const news = await this.ctx.service.site.delete_news(id);
    this.ctx.body = { data: news.toObject() };
  }

  async news_get() {
    const id = this.ctx.params.id;
    const news = await this.ctx.service.site.get_news(id);
    this.ctx.body = { data: news.toObject() };
  }

  async news_get_and_count_see_num() {
    const id = this.ctx.params.id;
    const news = await this.ctx.service.site.get_news_and_count_see_num(id);
    this.ctx.body = { data: news.toObject() };
  }

  async news_update() {
    const id = this.ctx.params.id;
    const obj = this.ctx.request.body;
    if (obj.state === 0) {
      delete obj.state;
    }
    const news = await this.ctx.service.site.update_news(id, obj);
    this.ctx.body = { data: news.toObject() };
  }

  async news_list() {
    const page_number = parseInt(this.ctx.query.page_number);
    const page_size = parseInt(this.ctx.query.page_size);
    const category = this.ctx.query.category;
    const is_focus = this.ctx.query.is_focus || '';
    const data = await this.ctx.service.site.news_list(page_number, page_size, category, is_focus);
    this.ctx.body = { data };
  }

}

module.exports = SiteController;
