const dbUtils = require('../DB/dbPool');
const articleDB = require('../DB/article');
const articleTypeDB = require('../DB/articleType');
module.exports = {
  async getAllArticle() {
    let dataList = await dbUtils.finAllDataOderBy(articleDB.ARTICLE_TABLE, articleDB.ARTICLE_EDIT_TIME,'DESC');
    return dataList;
  },
  async getArticleById(id) {
    let dataList = await dbUtils.findDataById(articleDB.ARTICLE_TABLE, id);
    return dataList;
  },
  async getTitleByTypeId(id){
    let _sql = 'SELECT ??,??,?? FROM ?? WHERE ?? = (SELECT ?? FROM ?? WHERE ?? = ?) ORDER BY ??';
    return await dbUtils.query(_sql, 
      [ articleDB.ARTICLE_EDIT_TIME,
        articleDB.ARTICLE_TITLE,
        articleDB.ARTICLE_ID,
        articleDB.ARTICLE_TABLE, 
        articleDB.ARTICLE_TYPE, 
        articleDB.ARTICLE_TYPE, 
        articleTypeDB.ARTICLE_TYPE_TABLE, 
        articleTypeDB.ARTICLE_TYPE_ID, 
        id, 
        articleDB.ARTICLE_EDIT_TIME]);
  },
  async insertArticle(model) {
    let result = await dbUtils.insertData(articleDB.ARTICLE_TABLE, model);
    return result;
  },
  async updateArticle(model) {
    let result = await dbUtils.updateData(articleDB.ARTICLE_TABLE, model);
    return result;
  },
  async deleteArticleById(id) {
    let result = await dbUtils.deleteDataById(articleDB.ARTICLE_TABLE, id);
    return result;
  },
  async getAllArticleType(){
    let result = await dbUtils.finAllDataOderBy(articleTypeDB.ARTICLE_TYPE_TABLE,articleTypeDB.ARTICLE_TYPE_ID,'DESC');
    return result;
    // let _sql = 'SELECT * FROM ?? WHERE ?? = (SELECT ?? FROM ?? WHERE ?? = ?) ORDER BY ??'; 
    // return await dbUtils.query(_sql, [articleDB.ARTICLE_TABLE, articleDB.ARTICLE_TYPE, articleDB.ARTICLE_TYPE,articleTypeDB.ARTICLE_TYPE_TABLE,articleTypeDB.ARTICLE_TYPE_ID,id,articleDB.ARTICLE_EDIT_TIME]);
  },
  async addArticleType(model){
    let result = await dbUtils.insertData(articleTypeDB.ARTICLE_TYPE_TABLE, model);
    return result;
  },
  async deleteArticleTypeById(id){
    let result = await dbUtils.deleteDataById(articleTypeDB.ARTICLE_TYPE_TABLE,id);
    return result;
  },
  async updateArticleType(model){
    let result = await dbUtils.updateData(articleTypeDB.ARTICLE_TYPE_TABLE,model);
    return result;
  },
};