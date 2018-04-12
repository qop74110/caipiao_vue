import ajax_url from "./ajax_url";
import product_type from "./product_type";

const global = {
  phoneRE: /^1[345789]\d{9}$/,
  product_type,

  ajax(){

  },
  isWeiXin: function () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
};



export default global;
