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
        const _this = this;

        this.$http({
            method: method,
            headers: head,
            url: ajax_url.host + ajax_url.api[url],
            data: data
        }).then(function (response) {
            let data = response.data;
            if (data.error_code === 600) {
                _this.$vux.loading.hide();
                _this.$router.push('/login');
                return;
            }
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
    // chongzhi: (_this, money, orderid) => {
    //     let type = '';
    //     _this.$vux.confirm.show({
    //         content: "余额不足，请选择充值方式",
    //         confirmText: '微信',
    //         cancelText: '支付宝',
    //         onCancel () {
    //             type = 5;
    //         },
    //         onConfirm () {
    //             type = 3;
    //         },
    //         onHide(){
    //             const g = _this.global;
    //             const token = g.cookie.get('token');
    //             if (token) window.location.href = `${g.ajax_url.host + g.ajax_url.api.pay1004}?token=${token}&money=${money}&type=${type}&orderid=${orderid}`;
    //             else this.$router.push("/login");
    //         }
    //     })
    // },
};


export default global;
