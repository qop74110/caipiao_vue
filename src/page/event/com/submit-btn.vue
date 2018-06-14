<template>
    <div class="submit-btn" @click="login">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'submit-btn',
        data () {
            return {
                disabled: true,
            }
        },
        created(){
            const channel = this.$route.query.channel;
            if (channel) this.global.cookie.set('channel', channel);
        },
        methods: {
            login(){
                if (this.disabled) {
                    let text = '';
                    const {code, getCodeNum, phone, phone_b} = this.$store.state.event;
                    if (getCodeNum === 0) text = '请获取验证码';
                    else if (phone !== phone_b) text = '不能修改手机号';
                    else if (code.length !== 4) text = '请输入验证码';
                    else {
                        this.disabled = false;
                        this.$vux.loading.show();
                        this.global.ajax.call(this, 'login', {mobile: phone, code}, (d) => {
                            if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                            else {
                                this.download();
                            }
                        });
                        return;
                    }
                    this.global.toast.call(this, text);
                }

            },
            download(){
                this.global.ajax.call(this, 'download_evnet', {terminal: this.global.getTerminal.call(this)}, (d) => {
                    this.$vux.loading.hide();
                    if (d.error_code !== 0) this.global.toast.call(this, d.error_message);
                    else {
                        this.disabled = true;
                        this.$router.push('/down1?url=' + d.data.url);
                    }
                });
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">

</style>
