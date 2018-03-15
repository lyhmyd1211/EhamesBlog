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
};
module.exports = article;

