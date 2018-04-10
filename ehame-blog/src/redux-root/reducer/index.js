import {
  ARTICLE_DATA, ARTICLE_DATA_ERROR, LOGIN_STATE, SCROLL_PERCENT, IS_SCROLL_UP, ARTICLE_CONTENT, ARTICLE_TYPE, ARTICLE_TYPE_ERROR, ARTICLE_TITLE, ARTICLE_DETAIL_SUCCESS, ARTICLE_DETAIL_ERROR} from '../action/action-type.js';
import { combineReducers } from 'redux';

/**
 * 获取所有文章内容 
 */
const article = (state={articleData:{Num:0,list:[]}},action)=>{
  switch (action.type) {
  case ARTICLE_DATA:
    return  {articleData:action.payload};
  case ARTICLE_DATA_ERROR:
    return state;
  default:
    return state;
  }
};

/**
 * 登录状态
 */
const loginState =(state={loginData:{retCode:0}},action)=>{
  switch (action.type) {
  case LOGIN_STATE:
    return {loginData:action.payload};
  default:
    return state;
  }
};

/**
 * 滚动条滚动百分比
 */
const scrollPercent =(state={percent:0,current:0},action)=>{
  switch (action.type) {
  case SCROLL_PERCENT:
    return {percent:action.payload.percent,current:action.payload.current};
  default:
    return state;
  }
};

/**
 * 滚动条是否向上
 */
const scrollUp = (state={isScrollUp:false},action)=>{
  switch (action.type) {
  case IS_SCROLL_UP:
    return {isScrollUp:action.payload};
  default:
    return state;
  }
};

/**
 * 获取单条文章内容    
 */
const getArticleContent = (state = { content: '',submit:false }, action) => {
  switch (action.type) {
  case ARTICLE_CONTENT:
    return action.payload;
  default:
    return state;
  }
};

/**
 * 获取所有文章类型
 */
const getArticleType = (state = {articleType:{root:{list:[]}}},action)=>{
  switch (action.type) {
  case ARTICLE_TYPE:
    return {articleType:action.payload}; 
  case ARTICLE_TYPE_ERROR:
    return {articleType:['获取失败']};
  default:
    return state;
  }
};

/**
 * 获取所有文章标题
 */
const getArticleTitle = (state = { articleTitle:{root:{list:[]}}},action)=>{
  switch (action.type) {
  case ARTICLE_TITLE:
    return {articleTitle: action.payload};
  default:
    return state;
  }
};
/**
 * 根据id获取文章详情
 */
const getArticleById = (state = {title:'',content:''}, action) => {
  switch (action.type) {
  case ARTICLE_DETAIL_SUCCESS:
    return action.payload;
  case ARTICLE_DETAIL_ERROR:
    return state;
  default:
    return state;
  }
};
export default combineReducers({
  article, loginState, scrollPercent, scrollUp, getArticleContent, getArticleType, getArticleTitle, getArticleById,
});

