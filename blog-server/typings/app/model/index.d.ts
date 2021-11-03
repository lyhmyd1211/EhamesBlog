// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportArticleType from '../../../app/model/article_type';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    ArticleType: ReturnType<typeof ExportArticleType>;
    User: ReturnType<typeof ExportUser>;
  }
}
