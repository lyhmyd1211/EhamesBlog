/**
 * 用户业务操作
 */

const validator = require('validator');
const userModel = require('../model/usersModel');
const userCode = require('../retCode/users');
const usersDB = require('../DB/users');
const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create(user) {
    let result = await userModel.create(user);
    return result;
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne(formData) {
    let resultData = await userModel.getExistOne({
      [usersDB.USER_EMAIL]: formData.email,
      [usersDB.USER_NAME]: formData.userName,
    });
    return resultData;
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn(formData) {
    let resultData = await userModel.getOneByUserNameAndPassword({
      [usersDB.USER_PASSWORD]: formData.password,
      [usersDB.USER_NAME]: formData.userName,
    });
    
    return resultData;
  },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {

    let resultData = await userModel.getUserInfoByUserName(userName) || {};
    // let userInfo = {
    //   [usersDB.USER_ID]:resultData.id,
    //   [usersDB.USER_EMAIL]: resultData.email,
    //   [usersDB.USER_NAME]: resultData.name,
    //   [usersDB.USER_NICK]:resultData.nick,
    //   [usersDB.USER_DETAIL_INFO]: resultData.detailInfo,
    //   [usersDB.USER_CREATE_TIME]: resultData.createTime,
    //   [usersDB.USER_MODIFIED_TIME]: resultData.modifiedTime,
    //   [usersDB.USER_LEVEL]:resultData.userLevel,
    // };
    return resultData;
  },


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp(userInfo) {
    let result = {
      retCode: 0,
      retMsg: '',
    };

    if (/[a-z0-9_-]{6,16}/.test(userInfo.userName) === false) {
      result.retMsg = userCode.ERROR_USER_NAME;
      return result;
    }
    if (!validator.isEmail(userInfo.email)) {
      result.retMsg = userCode.ERROR_EMAIL;
      return result;
    }
    if (!/[\w+]{6,16}/.test(userInfo.password)) {
      result.retMsg = userCode.ERROR_PASSWORD;
      return result;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      result.retMsg = userCode.ERROR_PASSWORD_CONFORM;
      return result;
    }

    result.retCode = 1;

    return result;
  },

};

module.exports = user;
