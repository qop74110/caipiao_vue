import ajax_url from "./ajax_url";
import product_type from "./product_type";
import {cookie} from 'vux';

const global = {
    ajax_url,
    phoneRE: /^1[345789]\d{9}$/,
    product_type,

    cookie,
    alert(content){
        this.$vux.alert.show({
            content: content,
        })
    },
    //求M的阶乘
    jiecheng (m){ //求阶乘
        if (m < 2)return 1;
        else return m * (this.jiecheng(m - 1)); //递归算:法n!=n*(n-1)!
    },

    ajax(url, data, callBack, head = {}, method = "POST"){
        head.token = cookie.get("token") || "";
        head.channel = cookie.get("channel") || "lottery-one";

        this.$http({
            method: method,
            headers: head,
            url: ajax_url.host + ajax_url.api[url],
            data: data
        }).then(function (response) {
            let data = response.data;
            callBack(data);
        }).catch(function (err) {
            console.log(err);
            callBack({error_message: "链接服务器失败"});
        })
    },
    toast(content = ""){
        this.$vux.toast.text(content, 'top');
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
