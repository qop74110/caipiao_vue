<template>
    <div class="getCode" @click="getCode">{{text}}</div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                text: '获取验证码',
                s: 60,
                time: null,

                state: null,            //  代替监听 数字验证码结果
            }
        },
        created(){
            this.state = this.$store.state.event;
        },
        methods: {
            getCode(){
                if (this.time === null) {
                    const mobile = this.$store.state.event.phone || '';
                    if (!this.global.testPhone.call(this, mobile)) this.global.toast.call(this, '手机号格式错误');
                    else {
                        this.$vux.loading.show();
                        this.global.ajax.call(this, 'login_code', {mobile}, (d) => {
                            this.$vux.loading.hide();
                            if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                            else {
                                this.$store.commit('setGetCodeNum');
                                this.$store.commit('setPhoneB');
                                this.countDown();
                            }
                        })
                    }
                }
            },
            countDown(){
                const _this = this;
                let s = this.s;
                this.text = `${this.s}s`;
                this.time = setInterval(() => {
                    _this.text = s + "s";
                    s--;
                    if (s === -1) {
                        clearInterval(_this.time);
                        _this.time = null;
                        _this.text = "获取验证码";
                    }
                }, 1000)
            }
        },
        watch: {
            state(val){
                if(val.suanfaState) this.getCode();
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">

</style>
