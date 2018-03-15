const router = require('koa-router')();

const users = require('./users');
const article = require('./article');

const {loginTest} = require('../wraperApi/model');

router.use(users.routes(), users.allowedMethods());
router.use(article.routes(), article.allowedMethods());
router.get('/loginTest',async (ctx)=>{
  let body ={
    username:'test',
    password:'123',
  };
  const data = await loginTest(body);
  console.log('data',data);
  ctx.response.body = data;
});

module.exports = router;
