'use strict';

const Service = require('egg').Service;
const pageQuery = require('../../util/pageQuery');

class SiteService extends Service {

  async create_news(obj) {
    const news = await this.ctx.model.Site.News.findOne({ title: obj.title });
    if (news) {
      this.ctx.throw(500, 'business logic error', { message: '不能出现相同标题的新闻' });
    }
    return await this.ctx.model.Site.News.create(obj);
  }

  async news_manage_list(page_number, page_size, title, category, is_focus) {
    const obj = {};

    if (title) {
      obj.title = title;
    }
    
    if (category !== 'all' && category !== '') {
      obj.category = category;
    }
    
    if (is_focus !== 'all' && is_focus !== '') {
      obj.is_focus = is_focus;
    }

    return await pageQuery(page_number, page_size, this.ctx.model.Site.News, '', obj, {
      update_time: 'desc',
    });
  }

  async delete_news(id) {
    const news = await this.ctx.model.Site.News.findById(id);
    if (!news) {
      this.ctx.throw(404);
    }

    return await news.remove();
  }

  async get_news(id) {
    const news = await this.ctx.model.Site.News.findById(id);
    if (!news) {
      this.ctx.throw(404);
    }

    return news;
  }
  
  async get_news_and_count_see_num(id) {
    const news = await this.ctx.model.Site.News.findById(id);
    if (!news) {
      this.ctx.throw(404);
    }

    news.set({ see_num: (news.see_num + 1) });
    return await news.save();
  }

  async update_news(id, obj) {
    const news = await this.ctx.model.Site.News.findById(id);
    if (!news) {
      this.ctx.throw(404);
    }

    const news_repeat = await this.ctx.model.Site.News.findOne({
      title: obj.title,
      _id: { $ne: id },
    });
    if (news_repeat) {
      this.ctx.throw(500, 'business logic error', { message: '不能出现相同标题的新闻' });
    }

    news.set(obj);
    return await news.save();
  }

  async news_list(page_number, page_size, category, is_focus) {
    const obj = {
      state: 2,
    };
    if (category !== '0') {
      obj.category = category;
    }

    if (is_focus !== '') {
      obj.is_focus = is_focus;
    }

    return await pageQuery(page_number, page_size, this.ctx.model.Site.News, '', obj, {
      sort_id: -1,
      create_time: 'desc',
    });
  }

}

module.exports = SiteService;
