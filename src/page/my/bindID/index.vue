<template>
    <div class="bindID page">
        <p class="tishi row">提现请先进行身份信息认证</p>
        <label class="label row">
            <span class="left fl">真实姓名</span>
            <input type="text" class="input" placeholder="必须与身份证保持一致" v-model="customerNm">
        </label>
        <label class="label row">
            <span class="left fl">身份证号</span>
            <input type="text" class="input" maxlength="19" placeholder="仅支持大陆第二代身份证" v-model="idCard">
        </label>
        <label class="label row">
            <span class="left fl">银行卡号</span>
            <input type="tel" class="input" maxlength="22" placeholder="输入银行卡号" v-model="accNo">
        </label>
        <label class="label row" @click="showPop=true">
            <span class="left fl">开户银行</span>
            <input type="text" class="input" placeholder="输入开户银行" v-model="open_bank" readonly="readonly">
        </label>
        <label class="label row">
            <span class="left fl">开户支行</span>
            <input type="text" class="input" placeholder="输入开户支行" v-model="open_bank_zhi">
        </label>
        <label class="label row">
            <span class="left fl">所<span class="em5"></span>在<span class="em5"></span>地</span>
            <input type="text" class="input" placeholder="输入开户银行所在地" v-model="location">
        </label>
        <label class="label row">
            <span class="left fl">手机号码</span>
            <input type="tel" class="input" maxlength="11" placeholder="银行预留手机号" v-model="phoneNo">
        </label>
        <div class="label row codeRow">
            <span class="left fl">验<span class="em5"></span>证<span class="em5"></span>码</span>
            <input type="tel" class="input" maxlength="4" placeholder="填写验证码" v-model="code">
            <span class="getCode btn_active" @click="getCode" :class="time !== null && 'gray'">{{getCodeBtnText}}</span>
        </div>

        <div class="submit redBg btn_active" @click="submit">立即验证</div>
        <p class="tishi">所有信息验证通过后均不可修改，请谨慎填写</p>

        <ul class="pop" @click="showPop = false"  v-show="showPop">
            <li class="item" v-for="(item, index) in bankList" :key="index" @click="open_bank=item">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import IdCardletidate from "../../../assets/js/IdCodeValid";
    import luhnCheck from "../../../assets/js/luhnCheck";

    export default {
        name: 'bindID',
        data () {
            return {
                getCodeBtnText: '获取验证码',
                time: null,
                getCodeNum: 0,                  //  获取短信验证码次数  点登录按钮 判断是否发送过验证码

                customerNm: '',                 //  姓名
                idCard: '',
                accNo: '',                      //  银行卡号
                open_bank: '',                  //  开户银行
                open_bank_zhi: '',
                location: '',                   //  所在地
                phoneNo: '',
                phoneNo2: '',                   //  防止获取验证码后修改手机号
                code: '',

                showPop: false,
                bankList: null,
            }
        },
        created(){
            this.$vux.loading.show();
            this.global.ajax.call(this, 'tx_bankList', {}, (d) => {
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.bankList = d.data;
                }
            })
        },
        methods: {
            getCode(){
                if (!this.global.phoneRE.test(this.phoneNo)) this.global.toast.call(this, "手机号格式错误");
                else {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, 'login_code', {mobile: this.phoneNo}, this.getCode_CB)
                }
            },
            getCode_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.getCodeNum++;
                    this.phoneNo2 = this.phoneNo;
                    this.countDown();
                }
            },
            countDown(){
                let s = 59;
                this.getCodeBtnText = "60s";
                this.time = setInterval(() => {
                    this.getCodeBtnText = s + "s";
                    s--;
                    if (s === -1) {
                        clearInterval(this.time);
                        this.time = null;
                        this.getCodeBtnText = "获取验证码";
                    }
                }, 1000)
            },

            submit(){
                let {customerNm, idCard, accNo, open_bank, location, phoneNo, phoneNo2, code, open_bank_zhi} = this;
                let text = "";
                if (this.getCodeNum === 0) this.global.toast.call(this, "请获取验证码");
                else if (code.length !== 4) this.global.toast.call(this, "验证码格式不正确");
                else if (phoneNo !== phoneNo2) this.global.toast.call(this, "禁止修改手机号");
                else if (!/^[\u4e00-\u9fa5]{2,20}$/.test(customerNm)) text = "请输入真实姓名";
                else if (!IdCardletidate(idCard)) text = "请输入真实身份证号";
                else if (!luhnCheck(accNo)) text = "银行卡格式不正确";
                else if (open_bank === "") text = "请输入开户银行";
                else if (open_bank_zhi === "") text = "请输入开户支行";
                else if (location === "") text = "请输入开户所在地";
                else {
                    this.$vux.loading.show();
                    this.global.ajax.call(this, 'tx_checkCode', {userphone: phoneNo, code}, (d) => {
                        if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                        else {
                            this.global.ajax.call(this, 'tx_bindID', {
                                accNo,
                                idCard,
                                customerNm,
                                phoneNo,
                                location,
                                open_bank:open_bank + "-" + open_bank_zhi,
                                cardholder: customerNm
                            }, this.submit_CB);
                            return;
                        }
                        this.$vux.loading.hide();
                    });
                    return;
                }
                this.global.toast.call(this, text);
            },
            submit_CB(d){
                this.$vux.loading.hide();
                if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                else {
                    this.$router.back();
                }
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
