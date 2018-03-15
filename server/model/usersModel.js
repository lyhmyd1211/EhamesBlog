const  dbUtils  = require('../DB/dbPool');
const  usersDB = require('../DB/users');

const user = {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( usersDB.USER_TABLE, model );
    return result;
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from ${usersDB.USER_TABLE}
      where ${usersDB.USER_EMAIL}= ? or ${usersDB.USER_NAME}= ?
      limit 1`;
    let result = await dbUtils.query(_sql, [options.email, options.name]);
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    
    let _sql = `
    SELECT * from ${usersDB.USER_TABLE}
      where ${usersDB.USER_PASSWORD}= ? and ${usersDB.USER_NAME}= ?
      limit 1`;
      
    let result = await dbUtils.query(_sql, [options.password, options.name] );
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {

    let result = await dbUtils.select(
      usersDB.USER_TABLE,
      [usersDB.USER_ID, usersDB.USER_EMAIL, usersDB.USER_NAME, usersDB.USER_DETAIL_INFO, usersDB.USER_CREATE_TIME, usersDB.USER_MODIFIED_TIME, usersDB.USER_LEVEL]);
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },



};


module.exports = user;
