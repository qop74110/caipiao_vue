<template>
    <div class="login page">

        <div class="telLogin">
            <label class="label vux-1px-b tel">
                <input type="tel" maxlength="11" v-model="tel" class="input" placeholder="请输入手机号"
                       @focus="hideWxLogin = true;" @blur="hideWxLogin = false">
            </label>
            <div class="label vux-1px-b code">
                <input type="tel" class="input" maxlength="4" v-model="code" placeholder="请输入验证码"
                       @focus="hideWxLogin = true;" @blur="hideWxLogin = false">
                <span class="getMsg fr" @click="getCode">{{getCodeBtnText}}</span>
            </div>

            <div class="submit btn_active" @click="submit">登录</div>
        </div>

        <div class="wxLogin" v-show="!hideWxLogin">
            <span class="wxLogin_text">第三方登录</span>
            <div>
                <img class="wx_img" src="./img/wx.png" @click="wxLogin">
            </div>

        </div>

        <div class="popup fog" v-show="showPop">
            <div class="popup_box">
                <div class="popup_top">
                    <div class="fl l">{{this.problem}}</div>
                    <input class="fr r" type="tel" v-model="u_answer" maxlength="2"/>
                </div>
                <div class="popup_bottom" @click="test">确定</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                tel: '',
                tel_b: '',                          //  获取验证码后   判断是否修改手机号
                code: '',
                getCodeBtnText: '获取验证码',
                time: null,
                getCodeNum: 0,                      //  获取短信验证码次数  点登录按钮 判断是否发送过验证码

                hideWxLogin: false,

                showPop: false,                     //  true：显示问题
                testState: false,                   //  问题是否答对
                u_answer: '',                       //  用户给的答案
                answer: null,                       //  正确答案
                problem: null,                      //  问题
            }
        },
        methods: {
            getCode(){
                if (!this.testState) this.showPop_fun();
                else {
                    const mobile = this.tel;
                    if (this.time === null) {
                        if (!this.global.phoneRE.test(mobile)) this.global.toast.call(this, "手机号格式错误");
                        else {
                            this.$vux.loading.show();
                            this.global.ajax.call(this, 'login_code', {mobile}, this.getCode_CB)
                        }
                    }
                }

            },
            getCode_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.getCodeNum++;
                    this.tel_b = this.tel;
                    this.countDown();
                }
            },
            countDown(){
                const _this = this;
                let s = 59;
                this.getCodeBtnText = "60s";
                this.time = setInterval(() => {
                    _this.getCodeBtnText = s + "s";
                    s--;
                    if (s === -1) {
                        clearInterval(_this.time);
                        _this.time = null;
                        _this.getCodeBtnText = "获取验证码";
                    }
                }, 1000)
            },
            showPop_fun(){
                function randomNum(min, max) {
                    return Math.floor(Math.random() * (max - min) + min)
                };
                this.showPop = true;
                const v1 = randomNum(1, 9)
                const v2 = randomNum(1, 9)
                this.problem = v1 + " + " + v2;
                this.answer = v1 + v2;
            },
            test(){
                if (this.u_answer * 1 === this.answer) {
                    this.testState = true;
                    this.getCode();
                    this.showPop = false;
                } else this.u_answer = "";
            },
            submit(){
                if (this.getCodeNum === 0) this.global.toast.call(this, "请获取验证码");
                else if (this.code.length !== 4) this.global.toast.call(this, "验证码格式不正确");
                else if (this.tel !== this.tel_b) this.global.toast.call(this, "禁止修改手机号");
                else {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, 'login', {mobile: this.tel, code: this.code}, this.submit_CB);
                }
            },
            submit_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    for (let k in d.data) {
                        this.global.cookie.set(k, d.data[k]);
                    }
                    this.$router.back();
                }
            },
            wxLogin(){
                if (this.global.isWeiXin()) this.global.alert.call(this, "敬请期待");
                else  this.global.alert.call(this, "请在微信客户端打开此链接");
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
