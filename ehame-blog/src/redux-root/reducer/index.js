import {
  ARTICLE_DATA, ARTICLE_DATA_ERROR, LOGIN_STATE, SCROLL_PERCENT, IS_SCROLL_UP, ARTICLE_CONTENT, ARTICLE_TYPE, ARTICLE_TYPE_ERROR} from '../action/action-type.js';
import { combineReducers } from 'redux';

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
const loginState =(state={loginData:{retCode:0}},action)=>{
  switch (action.type) {
  case LOGIN_STATE:
    return {loginData:action.payload};
  default:
    return state;
  }
};
const scrollPercent =(state={percent:0,current:0},action)=>{
  switch (action.type) {
  case SCROLL_PERCENT:
    return {percent:action.payload.percent,current:action.payload.current};
  default:
    return state;
  }
};
const scrollUp = (state={isScrollUp:false},action)=>{
  switch (action.type) {
  case IS_SCROLL_UP:
    return {isScrollUp:action.payload};
  default:
    return state;
  }
};
const getArticleContent = (state = { content: '' }, action) => {
  switch (action.type) {
  case ARTICLE_CONTENT:
    return { content: action.payload };
  default:
    return state;
  }
};
const getArticleType = (state = {articleType:{}},action)=>{
  switch (action.type) {
  case ARTICLE_TYPE:
    return {articleType:action.payload}; 
  case ARTICLE_TYPE_ERROR:
    return {articleType:['获取失败']};
  default:
    return state;
  }
};
export default combineReducers({
  article, loginState, scrollPercent, scrollUp, getArticleContent, getArticleType,
});