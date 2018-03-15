// const { getUser } = require('../DB/users');
const userCode = require('../retCode/users');
const usersService = require('../service/usersService');
const userDB = require('../DB/users');
const { getClientIp } = require('../util');
const {getIpLocation} = require('../wraperApi/model');
module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    let userResult = await usersService.signIn(formData);
    
    if (userResult) {
      if (formData.userName === userResult.name) {
        result.retCode = 1;
        result.root = userResult;
      } else {
        result.retMsg = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
      }
    } else {
      result.retMsg = userCode.FAIL_USER_NO_EXIST;
    }
    
    if (result.retCode === 1) {
      let session = ctx.session;
      session.isLogin = true;
      session.userName = userResult.name;
      session.userId = userResult.id;
      console.log('redis session',session);
      
    }
    ctx.response.body = result;
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp(ctx) {
    let formData = ctx.request.body;
    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };

    let validateResult = usersService.validatorSignUp(formData);

    if (validateResult.retCode === 0) {
      result = validateResult;
      ctx.response.body = result;
      return;
    }

    let existOne = await usersService.getExistOne(formData);

    if (existOne) {
      if (existOne.name === formData.userName) {
        result.retMsg = userCode.FAIL_USER_NAME_IS_EXIST;
        ctx.response.body = result;
        return;
      }
      if (existOne.email === formData.email) {
        result.retMsg = userCode.FAIL_EMAIL_IS_EXIST;
        ctx.body = result;
        return;
      }
    }


    let userResult = await usersService.create({
      [userDB.USER_EMAIL]: formData.email,
      [userDB.USER_PASSWORD]: formData.password,
      [userDB.USER_NAME]: formData.userName,
      [userDB.USER_CREATE_TIME]: new Date().getTime(),
      [userDB.USER_LEVEL]: 1,
    });

    if (userResult && userResult.insertId * 1 > 0) {
      result.retCode = 1;
    } else {
      result.retMsg = userCode.ERROR_SYS;
    }

    ctx.response.body = result;
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo(ctx) {
    let session = ctx.session;
    let isLogin = session.isLogin;
    let userName = session.userName;


    let result = {
      retCode: 0,
      retMsg: '',
      root: [],
    };
    if (isLogin === true && userName) {
      let userInfo = await usersService.getUserInfoByUserName(userName);
      if (userInfo) {
        result.root = userInfo;
        result.retCode = 1;
      } else {
        result.retMsg = userCode.FAIL_USER_NO_LOGIN;
      }
    } else {
      // TODO
    }

    ctx.response.body = result;
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  async validateLogin(ctx) {
    let result = {
      retCode: 0,
      retMsg: userCode.FAIL_USER_NO_LOGIN,
      root: [],
      ip:'0.0.0.0',
      location:{},
    };
    let session = ctx.session;
    let userName = session.userName;
    if (session && session.isLogin && session.userName ) {
      result.retCode = 1;
      result.retMsg = userCode.HAD_LOGINED;
      result.root = await usersService.getUserInfoByUserName(userName);
      result.ip = getClientIp(ctx.request);
      // result.location = getIpLocation(getClientIp(ctx.request));
      console.log('getlocation', await getIpLocation('220.181.111.85'));
      result.location = await getIpLocation('220.181.111.85');
      
    }
    ctx.response.body = result;
  },

  async getLocationFromIp(ctx){
    console.log('getClientIp(ctx.request)', getClientIp(ctx.request));
    return getIpLocation(getClientIp(ctx.request));
  },
};