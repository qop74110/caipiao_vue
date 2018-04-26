<template>
    <div class="bindID page">
        <p class="tishi row">提现请先进行身份信息认证</p>
        <label class="label row">
            <span class="left fl">真实姓名</span>
            <input type="text" class="input" placeholder="必须与身份证保持一致">
        </label>
        <label class="label row">
            <span class="left fl">身份证号</span>
            <input type="text" class="input" maxlength="19" placeholder="仅支持大陆第二代身份证">
        </label>
        <label class="label row">
            <span class="left fl">手机号码</span>
            <input type="tel" class="input" maxlength="11" placeholder="当您中奖时，第一时间联系您">
        </label>
        <div class="label row codeRow">
            <span class="left fl">验<span class="em5"></span>证<span class="em5"></span>码</span>
            <input type="tel" class="input" maxlength="4" placeholder="填写验证码">
            <span class="getCode">{{getCodeBtnText}}</span>
        </div>

        <div class="submit redBg btn_active">立即验证</div>
        <p class="tishi">所有信息验证通过后均不可修改，请谨慎填写</p>
    </div>
</template>

<script>
    export default {
        name: 'bindID',
        data () {
            return {
                getCodeBtnText: '获取验证码'
            }
        },
        created(){

        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
