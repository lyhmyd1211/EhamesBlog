let tools ={
  /**
   * 数据库格式转驼峰命名
   */
  convertToJs:function (result){
    result = result.replace(/_(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    return result;
  },
  /**
   * 获取客户端登录IP
   */
  getClientIp : function (req) {
    let ip = req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0];
    }
    return ip;
  },
};
module.exports = tools;