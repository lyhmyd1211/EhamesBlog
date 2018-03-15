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
  getIpLocation : function (ip, cb) {
    let sina_server_api = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
    let url = sina_server_api + ip;
    http.get(url, function (res) {
      let code = res.statusCode;
      if (code == 200) {
        res.on('data', function (data) {
          try {
            cb(null, JSON.parse(data));
          } catch (err) {
            cb(err);
          }
        });
      } else {
        cb({ code: code });
      }
    }).on('error', function (e) { cb(e); });
  },
};
module.exports = tools;