// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getArticleList(options?: { [key: string]: any }) {
  return request<API.ListResult<API.Article>>('/api/getArticleList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function delArticle(params: { id: string }, options?: { [key: string]: any }) {
  console.log('params', params);
  return request<Record<string, any>>('/api/delArticle', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
