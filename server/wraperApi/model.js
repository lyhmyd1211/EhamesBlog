const rp = require('request-promise');
module.exports = {
  getIpLocation(ip) {
    let options = {
      method: 'get',
      url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='+ip,
    };
    return new Promise((resolve, reject) => {
      rp(options).then((result) => {
        const data = JSON.parse(result);
        if (data.ret) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  },
  loginTest(body) {
    console.log('body',body);
    let options = {
      method: 'post',
      url: 'http://jiyaowang.tunnel.echomod.cn/services/security/login',
      body,
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options).then((result) => {
        console.log('result',result);
        const data = result;
        console.log('datasss',data);
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  },
};

