<template>
  <div class="login page">

    <div class="telLogin">
      <label class="label vux-1px-b tel">
        <input type="tel" maxlength="11" v-model="tel" class="input" placeholder="请输入手机号">
      </label>
      <div class="label vux-1px-b code">
        <input type="tel" class="input" maxlength="4" v-model="code" @click="getCode" placeholder="请输入验证码">
        <span class="getMsg fr">获取验证码</span>
      </div>

      <div class="submit">登录</div>
    </div>

    <div class="wxLogin">
      <span class="wxLogin_text">第三方登录</span>
      <div>
        <img class="wx_img" src="./img/wx.png" alt="">
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
        code: '',
      }
    },
    methods: {
      getCode(){
        const mobile = this.tel;
        if (!this.global.phoneER.test(mobile)) this.toast.call(this, "手机号格式错误");
        else {

        }
      },
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
