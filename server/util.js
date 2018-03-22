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
  /**
   * 生成UUID
   */
  guid: function () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  },
};
module.exports = tools;