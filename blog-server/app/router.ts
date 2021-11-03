import { Application } from 'egg';

export default (app: Application) => {
  app.beforeStart(async () => {
    await app.model.sync({ alter: true });// force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  });
  const { controller, router, jwt } = app;
  const { home, article } = controller;
  router.get('/', home.index);
  router.get('/admin', home.admin);
  router.get('/api/logout', home.logout);

  const localStrategy = app.passport.authenticate('local', { successRedirect: '/api/loginCallback', failureRedirect: '/api/loginFailCallback' });
  router.post('/api/login', localStrategy);
  // router.post('/passport/local', home.localPassport);
  router.get('/api/loginCallback', home.loginCallback);
  router.get('/api/loginFailCallback', home.loginFailCallback);
  router.get('/api/currentUser', jwt, home.getCurrentUser);
  router.get('/api/getArticleList', jwt, article.getArticleList);
  router.get('/api/delArticle', jwt, article.delArticle);
};
