<template>
    <div class="event1">
        <div class="form">
            <label class="row whiteBg">
                <span class="k fl">手机号</span>
                <phoneInput class="fl input"></phoneInput>
            </label>
           <div class="row codeRow whiteBg">
               <span class="k fl">验证码</span>
               <codeInput class="input fl"></codeInput>
               <getCodeBtn class="getCodeBtn btn btn_active" v-if="$store.state.event.suanfaState"></getCodeBtn>
               <Suanfa  class="getCodeBtn btn btn_active" v-else></Suanfa>
           </div>

            <submitBtn class="row btn submit btn_active">注册</submitBtn>
        </div>

    </div>
</template>

<script>

    import phoneInput from '../com/phone-input.vue';
    import codeInput from '../com/code-input.vue';
    import getCodeBtn from '../com/getCode-btn.vue';
    import submitBtn from '../com/submit-btn.vue';
    import Suanfa from 'com/SuanfaAlert';
    export default {
        name: 'event1',
        components: {
            phoneInput,
            codeInput,
            getCodeBtn,
            Suanfa,
            submitBtn
        },
        data () {
            return {
                show_algorithm: false,
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
