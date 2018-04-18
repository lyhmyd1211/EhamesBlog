const dbUtils = require('../DB/dbPool');
const articleDB = require('../DB/article');
const articleTypeDB = require('../DB/articleType');
module.exports = {

  /**
   * 获取所有文章内容
   */
  async getAllArticle() {
    let dataList = await dbUtils.finAllDataOderBy(articleDB.ARTICLE_TABLE, articleDB.ARTICLE_EDIT_TIME,);
    return dataList;
  },

  /**
   * 根据文章id获取内容
   * @param {} id 文章id
   */
  async getArticleById(id) {
    let dataList = await dbUtils.findDataById(articleDB.ARTICLE_TABLE, id);
    return dataList;
  },
 
  /**
   * 根据文章类型id以及文章状态获取属于当前类型的文章
   * @param {*} model { id:类型id   state: 0：所有文章，1：已发布，2：未发布}
   */
  async getTitleByTypeId(model) {
    if (model.state!=='0') {
      let _sql = 'SELECT ??,??,?? FROM ?? WHERE ?? = ? AND ?? = ? ORDER BY ?? DESC';
      return await dbUtils.query(_sql,
        [articleDB.ARTICLE_EDIT_TIME,
          articleDB.ARTICLE_TITLE,
          articleDB.ARTICLE_ID,
          articleDB.ARTICLE_TABLE,
          articleDB.ARTICLE_TYPE,
          model.id,
          articleDB.ARTICLE_STATE,
          model.state,
          articleDB.ARTICLE_EDIT_TIME]);
    }
    else{
      let _sql = 'SELECT ??,??,?? FROM ?? WHERE ?? = ? ORDER BY ?? DESC';
      return await dbUtils.query(_sql,
        [articleDB.ARTICLE_EDIT_TIME,
          articleDB.ARTICLE_TITLE,
          articleDB.ARTICLE_ID,
          articleDB.ARTICLE_TABLE,
          articleDB.ARTICLE_TYPE,
          model.id,
          articleDB.ARTICLE_EDIT_TIME]);
    }
  },

  /**
   * 新增文章
   * @param {*} model 文章实体类
   */
  async insertArticle(model) {
    let result = await dbUtils.insertData(articleDB.ARTICLE_TABLE, model);
    return result;
  },

  /**
   * 更新文章
   * @param {*} model 文章实体类，包括文章id
   */
  async updateArticle(model,id) {
    console.log('model', model);
    console.log('id', id);
    let result = await dbUtils.updateData(articleDB.ARTICLE_TABLE, model,id);
    return result;
  },

  /**
   * 删除文章
   * @param {*} id 文章id
   */
  async deleteArticleById(id) {
    let result = await dbUtils.deleteDataById(articleDB.ARTICLE_TABLE, id);
    return result;
  },

  /**
   * 获取所有可修改文章类型
   */
  async getAllArticleType(){
    let result = await dbUtils.finAllDataOderBy(articleTypeDB.ARTICLE_TYPE_TABLE,articleTypeDB.ARTICLE_TYPE_ID);
    return result;
  },

  /**
   * 新增文章类型
   * @param {} model 文章类型实体类
   */
  async addArticleType(model){
    let result = await dbUtils.insertData(articleTypeDB.ARTICLE_TYPE_TABLE, model);
    return result;
  },

  /**
   * 删除文章类型    TODO
   * @param {*} id 文章类型id
   */
  async deleteArticleTypeById(id){
    let result = await dbUtils.deleteDataById(articleTypeDB.ARTICLE_TYPE_TABLE,id);
    return result;
  },

  /**
   * 更新文章类型          TODO
   * @param {*} model 文章类型实体类
   */
  async updateArticleType(model,id){
    console.log('model',model);
    console.log('id',id);
    let result = await dbUtils.updateData(articleTypeDB.ARTICLE_TYPE_TABLE,model,id);
    return result;
  },
};