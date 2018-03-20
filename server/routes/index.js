const router = require('koa-router')();

const users = require('./users');
const article = require('./article');

router.use(users.routes(), users.allowedMethods());
router.use(article.routes(), article.allowedMethods());


module.exports = router;
