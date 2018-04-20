import { ARTICLE_DATA, ARTICLE_DATA_ERROR, ARTICLE_CONTENT, ARTICLE_TYPE, ARTICLE_TYPE_ERROR, ARTICLE_TITLE, ARTICLE_TITLE_ERROR, ARTICLE_DETAIL_SUCCESS, ARTICLE_DETAIL_ERROR, CURRENT_TYPE_ID, CURRENT_ARTICLE_ID, DETAIL_STATE} from '../action-type';
import {get} from '../../../fetchData';

const getArticleSuccess = (n) => ({
  type: ARTICLE_DATA,
  payload: n,
});
const getArticleError = (n) => ({
  type: ARTICLE_DATA_ERROR,
});
const getArticleTypeSuccess = (n) => ({
  type: ARTICLE_TYPE,
  payload: n,
});
const getArticleTypeError = (n) => ({
  type: ARTICLE_TYPE_ERROR,
  payload: n,
});
const getArticleTitleSuccess = (n) => ({
  type: ARTICLE_TITLE,
  payload: n,
});
const getArticleTitleError = (n) => ({
  type: ARTICLE_TITLE_ERROR,
});
const getArticleByIdSuccess = (n) => ({
  type: ARTICLE_DETAIL_SUCCESS,
  payload: n,
});
const getArticleByIdError = (n) => ({
  type: ARTICLE_DETAIL_ERROR,
  payload: n,
});

export const setCurrentTypeId = (n) => ({
  type: CURRENT_TYPE_ID,
  payload: n,
});
export const setCurrentArticleId = (n) => ({
  type: CURRENT_ARTICLE_ID,
  payload: n,
});
export const ArticleContent = (n) => ({
  type: ARTICLE_CONTENT,
  payload: n,
});
export const detailState = (n) =>({
  type:DETAIL_STATE,
  payload:n,
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
export const fetchArticleTitleList = (model) => async (dispatch, getState) => {
  try {
    await get(`/article/getTitlebyTypeId/${model.id}?state=${model.state}`, data => {
      if (data.retCode) {
        dispatch(getArticleTitleSuccess(data));
      }else{
        dispatch(getArticleTitleError(data));
      }
    });
  } catch (error) {
    dispatch(getArticleTitleError());
  }
};
export const fetchArticleById = (id) => async (dispatch, getState) =>{
  try {
    await get(`/article/getbyId/${id}`, data => {
      if (data.retCode) {
        dispatch(getArticleByIdSuccess(data.root.list[0]));    
      }
    });
  } catch (error) {
    dispatch(getArticleByIdError);
  }
};

