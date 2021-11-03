import { Controller } from 'egg';

export default class ArticleController extends Controller {
  async getArticleList() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    const tmp = await ctx.service.article.queryArticle(page, size);
    console.log('temp', tmp);
    ctx.body = {
      data: tmp.rows.map(item => item),
      total: tmp.count,
      code: 0,
    };
  }

  async delArticle() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.article.delArticle(id);
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '删除成功',
      };
    } else {
      ctx.body = {
        data: null,
        code: -1,
        msg: '删除失败',
      };
    }
  }

  async addArticle() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.article.addArticle(body);
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '添加成功',
      };
    }
  }

}
