// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportArticleType from '../../../app/service/article_type';
import ExportLogin from '../../../app/service/login';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    articleType: AutoInstanceType<typeof ExportArticleType>;
    login: AutoInstanceType<typeof ExportLogin>;
  }
}
