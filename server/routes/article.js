
const router = require('koa-router')();
const articleCtrl = require('../controller/articleCtrl');
router.prefix('/article');

const routers = router
  .get('/getAll', articleCtrl.getArticle)
  .get('/getbyId/:id',articleCtrl.getArticleById)
  .get('/getType',articleCtrl.getArticleType)
  .post('/write', articleCtrl.insertArticle)
  .post('/addType', articleCtrl.addArticleType)
  .post('/deleteType', articleCtrl.deleteArticleType)
  .post('/updateType', articleCtrl.updateArticleType);
  

module.exports = routers;
