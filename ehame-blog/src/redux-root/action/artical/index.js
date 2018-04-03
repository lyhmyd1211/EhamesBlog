import { ARTICLE_DATA, ARTICLE_DATA_ERROR, ARTICLE_CONTENT, ARTICLE_TYPE, ARTICLE_TYPE_ERROR, ARTICLE_TITLE, ARTICLE_TITLE_ERROR } from '../action-type';
import {get} from '../../../fetchData';
const getArticleSuccess = (n) => ({
  type: ARTICLE_DATA,
  payload: n,
});
const getArticleError = (n)=>({
  type: ARTICLE_DATA_ERROR,
});
const getArticleTypeSuccess = (n)=>({
  type:ARTICLE_TYPE,
  payload:n,
});
const getArticleTypeError = (n)=>({
  type:ARTICLE_TYPE_ERROR,
  payload:n,
});
export const ArticleContent = (n)=>({
  type:ARTICLE_CONTENT,
  payload:n,
});
const getArticleTitleSuccess = (n) => ({
  type: ARTICLE_TITLE,
  payload: n,
});
const getArticleTitleError = (n) => ({
  type: ARTICLE_TITLE_ERROR,
});
export const fetchArticle =()=>async (dispatch,getState)=>{
  try {
    await get('/article/getAll', data => {
      dispatch(getArticleSuccess(data.root));
    });
  } catch (error) {
    await dispatch(getArticleError());
  }
};
export const fetchArticleType=()=> async (dispatch,getState)=>{
  try {
    await get('/article/getType', data => {
      dispatch(getArticleTypeSuccess(data));     
    });
  } catch (error) {
    dispatch(getArticleTypeError());
  }
};
export const fetchArticleList = (model) => async (dispatch, getState) => {
  
  try {
    await get(`/article/getbyType/${model.id}?state=${model.state}`, data => {
      dispatch(getArticleTitleSuccess(data));
    });
  } catch (error) {
    dispatch(getArticleTitleError());
  }
};

