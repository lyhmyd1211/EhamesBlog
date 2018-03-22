const articleModel = require('../model/articleModel');
const article = {
  async getArticle() {
    let content = await articleModel.getAllArticle();
    return content;
  },
  async getArticleById(id){
    let content = await articleModel.getArticleById(id);
    return content;
  },
  async getArticleByType(id) {
    let content = await articleModel.getTitleByTypeId(id);
    return content;
  },
  async insertArticle(formData){
    let content = await articleModel.insertArticle(formData);
    return content;
  },
  async updateArticle(formData) {
    let content = await articleModel.updateArticle(formData);
    return content;
  },
  async deleteArticle(id) {
    let content = await articleModel.deleteArticleById(id);
    return content;
  },
  async getAllArticleType(){
    let content = await articleModel.getAllArticleType();
    return content;
  },
  async addArticleType(formData){
    let content = await articleModel.addArticleType(formData);
    return content;
  },
  async deleteArticleType(id){
    let content = await articleModel.deleteArticleTypeById(id);
    return content;
  },
  async updateArticleType(formData){
    let content = await articleModel.updateArticleType(formData);
    return content;
  },
};
module.exports = article;

