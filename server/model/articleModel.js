const dbUtils = require('../DB/dbPool');
const articleDB = require('../DB/article');
module.exports = {
  async getAllArticle() {
    let dataList = await dbUtils.finAllDataOderBy(articleDB.ARTICLE_TABLE, articleDB.ARTICLE_EDIT_TIME,'DESC');
    return dataList;
  },
  async getArticleById(id) {
    let dataList = await dbUtils.findDataById(articleDB.ARTICLE_TABLE, id);
    return dataList;
  },
  async insertArticle(model) {
    let result = await dbUtils.insertData(articleDB.ARTICLE_TABLE, model);
    return result;
  },
  async updateArticle(model) {
    let result = await dbUtils.updateData(articleDB.ARTICLE_TABLE, model, model.id);
    return result;
  },
  async deleteArticleById(id) {
    let result = await await dbUtils.deleteDataById(articleDB.ARTICLE_TABLE, id);
    return result;
  },
};