//const { getAllArticle } = require('../DB/article');
const  articleService = require('../service/articleService');
const articleCode = require('../retCode/article');
const articleDB = require('../DB/article');
const articleTypeDB = require('../DB/articleType');
module.exports={
  async getArticle(ctx, next) {
    let query = ctx.query || {};
    console.log('query', query);
    let result = {
      retCode: 0,
      retMsg: '',
      root: { list: [] },
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
      root: { list: [] },
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
  async getTitleByTypeId(ctx, next) {
    let id = ctx.params.id;
    let model = Object.assign(ctx.query,{id});
    let result = {
      retCode: 0,
      retMsg: '',
      root: { list: [] },
    };
    let content = await articleService.getTitleByTypeId(model);
    
    if (content.length > 0) {
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
      root: { list: [] },
    };
    let content = await articleService.insertArticle({
      [articleDB.ARTICLE_TITLE]:formData.title,
      [articleDB.ARTICLE_MD_CONTENT]:formData.mdContent,
      [articleDB.ARTICLE_HTML_CONTENT]: formData.htmlContent,
      [articleDB.ARTICLE_RELEASE_TIME]: new Date(),
      [articleDB.ARTICLE_EDIT_TIME]: new Date(),
      [articleDB.ARTICLE_TYPE]:formData.type,
      [articleDB.ARTICLE_STATE]:formData.state,

    });
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_INSERT_ARTICLE;
      result.root = content;
    } else {
      result.retMsg = articleCode.ERROR_INSERT_ARTICLE;
    }
    console.log('result',result);
    
    ctx.response.body = result;
  },
  async updateArticle(ctx, next) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: { list: [] },
    };
    let content = await articleService.updateArticle({
      [articleDB.ARTICLE_TITLE]: formData.title,
      [articleDB.ARTICLE_MD_CONTENT]: formData.mdContent,
      [articleDB.ARTICLE_HTML_CONTENT]: formData.htmlContent,
      [articleDB.ARTICLE_TYPE]: formData.type,
    }, formData.id);
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
      root: { list: [] },
    };
    let content = await articleService.deleteArticle(formData.id);
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_DELETE_ARTICLE;
      result.root = content;
    } else {
      result.retMsg = articleCode.ERROR_DELETE_ARTICLE;
    }
    ctx.response.body = result;
  },
  async getArticleType(ctx,next){
    let result = {
      retCode: 0,
      retMsg: '',
      root: {list:[]},
    };
    let content = await articleService.getAllArticleType();
    //todo 处理type
    if (content.length > 0) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_GET_ARTICLE_TYPE;
      let arr = Array.from(new Set(content.map(_ => _.type))).map(_ => { return { content: [], type: _}; });
      arr.map((arrItem, index) => {
        content.map(item => {
          if (item.type === arrItem.type) {
            arrItem.content.push(item);
            arrItem.typeId = item.typeId;
          }
        });
      });
      result.root = {
        Num: arr.length,
        list: arr,
      };
    } else {
      result.retMsg = articleCode.ERROR_GET_ARTICLE_TYPE;
    }
    ctx.response.body = result;
  },
  async addArticleType(ctx,next){
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: { list: [] },
    };
    let content = await articleService.addArticleType({
      [articleTypeDB.ARTICLE_TYPE]:formData.type,
    });
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_INSERT_ARTICLE_TYPE;
      result.root = {
        Num: content.length,
        list: content,
      };
    } else {
      result.retMsg = articleCode.ERROR_INSERT_ARTICLE_TYPE;
    }
    ctx.response.body = result;
  },
  async deleteArticleType(ctx, next) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root:{list:[]},
    };
    console.log('deletectrl',formData.id);
    
    let content = await articleService.deleteArticleType(formData.id);
    console.log('content',content);
    
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_DELETE_ARTICLE_TYPE;
      result.root = {
        Num: content.length,
        list: content,
      };
    } else {
      result.retMsg = articleCode.ERROR_DELETE_ARTICLE_TYPE;
    }
    ctx.response.body = result;
  },
  async updateArticleType(ctx,next){
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: {list:[]},
    };
    let content = await articleService.updateArticleType({
      [articleTypeDB.ARTICLE_TYPE]: formData.type,
    },formData.id);
    if (content) {
      result.retCode = 1;
      result.retMsg = articleCode.SUCCESS_UPDATE_ARTICLE_TYPE;
      result.root = {
        Num: content.length,
        list: content,
      };
    } else {
      result.retMsg = articleCode.ERROR_UPDATE_ARTICLE_TYPE;
    }
    ctx.response.body = result;
  },
};