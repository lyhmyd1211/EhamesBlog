import { Service } from '../core/service';

export default class ArticleService extends Service {
  async queryArticleType(page = 1, size = 10) {
    return await this.ctx.model.ArticleType.findAndCountAll({
      order: [[ 'id', 'DESC' ]],
      offset: (page - 1) * size,
      limit: size,
    });
  }
  async delArticleType(id: string) {
    const atype = await this.ctx.model.ArticleType.findByPk(id);
    if (!atype) {
      return false;
    }
    await atype.destroy();
    return true;
  }

  async addArticleType(body) {
    return await this.ctx.model.ArticleType.create(body);
  }

  async updateArticleType(id, body) {
    const atype = await this.ctx.model.ArticleType.findByPk(id);
    if (!atype) {
      return false;
    }

    return await atype.update(body);
  }
}
