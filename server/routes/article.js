
const router = require('koa-router')();
const articleCtrl = require('../controller/articleCtrl');
router.prefix('/article');

const routers = router
  .get('/getAll', articleCtrl.getArticle)
  .get('/getbyId/:id',articleCtrl.getArticleById);

module.exports = routers;
