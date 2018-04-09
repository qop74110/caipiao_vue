import ajax_url from "./ajax_url";

const common = {
  phoneRE: /^1[345789]\d{9}$/,

  ajax(){

  },
  isWeiXin:function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
};
