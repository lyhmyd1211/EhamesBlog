const router = require('koa-router')();
const usersContrl = require('../controller/usersCtrl');
router.prefix('/users');

const routers = router
  .get('/isLogin', usersContrl.validateLogin)
  .get('/getUserInfo', usersContrl.getLoginUserInfo)
  .post('/signIn', usersContrl.signIn)
  .post('/signUp', usersContrl.signUp);

module.exports = routers;
