//const { getAllArticle } = require('../DB/article');
const  articleService = require('../service/articleService');
const articleCode = require('../retCode/article');
const articleDB = require('../DB/article');
module.exports={
  async getArticle(ctx, next) {
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let content = await articleService.getArticle();
    if (content.length > 0) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_GET_ARTICLE;
      result.root = {
        Num:content.length,
        list:content,
      };
    } else {
      result.retMsg = articleCode.ERROR_GET_ARTICLE;
    }
    ctx.response.body = result;
  },
  async getArticleById(ctx, next) {
    let id = ctx.params.id;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let content = await articleService.getArticleById(id);
    if (content.length>0) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_GET_ARTICLE;
      result.root = {
        Num: content.length,
        list: content,
      };
    } else {
      result.retMsg = articleCode.ERROR_GET_ARTICLE;
    }
    ctx.response.body = result;
    ctx.body = result;
  },
  async insertArticle(ctx, next) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let content = await articleService.insertArticle({
      [articleDB.ARTICLE_TITLE]:formData.title,
      [articleDB.ARTICLE_CONTENT]:formData.content,
      [articleDB.ARTICLE_PICTURE]: formData.picture,
      [articleDB.ARTICLE_DESP]: formData.desp,
      [articleDB.ARTICLE_VISIBILITY]:formData.visibility,

    });
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_INSERT_ARTICLE;
      result.root = content;
    } else {
      result.retMsg = articleCode.ERROR_INSERT_ARTICLE;
    }
    ctx.response.body = result;
  },
  async updateArticle(ctx, next) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let content = await articleService.updateArticle({
      [articleDB.ARTICLE_ID]: formData.userId,
      [articleDB.ARTICLE_TITLE]: formData.title,
      [articleDB.ARTICLE_CONTENT]: formData.content,
      [articleDB.ARTICLE_PICTURE]: formData.picture,
      [articleDB.ARTICLE_DESP]: formData.desp,
      [articleDB.ARTICLE_VISIBILITY]: formData.visibility,

    });
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_UPDATE_ARTICLE;
      result.root = content;
    } else {
      result.retMsg = articleCode.ERROR_UPDATE_ARTICLE;
    }
    ctx.response.body = result;
  },
  async deleteArticle(ctx, next) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let content = await articleService.deleteArticle({
      [articleDB.ARTICLE_ID]: formData.userId,
    });
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_DELETE_ARTICLE;
      result.root = content;
    } else {
      result.retMsg = articleCode.ERROR_DELETE_ARTICLE;
    }
    ctx.response.body = result;
  },
};