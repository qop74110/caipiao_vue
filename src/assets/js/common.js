import ajax_url from "./ajax_url";
import product_type from "./product_type";

const global = {
  phoneRE: /^1[345789]\d{9}$/,
  product_type,

  alert(){
    this.$vux.alert.show({
      title: 'Vux is Cool',
      content: 'Do you agree?',
      onShow () {
        console.log('Plugin: I\'m showing')
      },
      onHide () {
        console.log('Plugin: I\'m hiding')
      }
    })
  },
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
