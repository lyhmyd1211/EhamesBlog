const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const session = require('koa-session-minimal');
// const session = require('koa-session-redis');
const MysqlStore = require('koa-mysql-session');
const cors = require('koa2-cors');

const config = require('../config');
const index = require('./routes');


const sessionMysqlConfig = {
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  host: config.database.host,
};
// error handler
onerror(app);


// middlewares
app.use(session({ 
  // store: {
  //   host: process.env.SESSION_PORT_6379_TCP_ADDR || '127.0.0.1',
  //   port: process.env.SESSION_PORT_6379_TCP_PORT || 6379,
  //   ttl: 3600,
  // },
  store: new MysqlStore(sessionMysqlConfig),
  key: 'USER_SID',
  cookie: {                   // 与 cookie 相关的配置
    path: '/',              // 写 cookie 所在的路径
    httpOnly: false,         // 是否只用于 http 请求中获取
    overwrite: false,        // 是否允许重写
    maxAge: 1000 * 30,   
  },
}));
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(path.join(__dirname,'../')));
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true,
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(views(__dirname + '/views', {
  extension: 'pug',
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
