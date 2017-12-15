let config = {};

let localHost = window.location.host;
let isHttps = 'https:' === document.location.protocol;

if (localHost.indexOf('localhost') !== -1 || localHost.indexOf('192') !== -1) {
  config = {
    // hostApi: 'http://h5.yfunion.com',//正式地址
    // hostApi: 'https://m.yfunion.com',//正式地址
     hostApi: 'http://git.tiantr.com',//测试地址
    localHost: 'http://' + localHost + '/'
  };
} else {
  config = {
    hostApi: (isHttps ? 'https://' : 'http://') + localHost,
    localHost: (isHttps ? 'https://' : 'http://') + localHost + '/'
  }
}

export default {
  config
}
