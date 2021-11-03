import { Service } from '../core/service';

export default class ArticleService extends Service {
  async queryArticle(page = 1, size = 10) {
    return await this.ctx.model.Article.findAndCountAll({
      order: [[ 'id', 'DESC' ]],
      offset: (page - 1) * size,
      limit: size,
    });
  }
  async delArticle(id: string) {
    const article = await this.ctx.model.Article.findByPk(id);
    if (!article) {
      return false;
    }
    await article.destroy();
    return true;
  }

  async addArticle(body) {
    return await this.ctx.model.Article.create(body);
  }

  async updateArticle(id, body) {
    const atype = await this.ctx.model.Article.findByPk(id);
    if (!atype) {
      return false;
    }

    return await atype.update(body);
  }
}
