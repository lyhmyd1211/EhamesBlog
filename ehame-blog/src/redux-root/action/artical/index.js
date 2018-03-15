import { ARTICLE_DATA, ARTICLE_DATA_ERROR } from '../action-type';
import {get} from '../../../fetchData';
const getArticleSuccess = (n) => ({
  type: ARTICLE_DATA,
  payload: n,
});
const getArticleError = (n)=>({
  type: ARTICLE_DATA_ERROR,
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