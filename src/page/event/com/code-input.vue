<template>
    <div class="code_input">
        <input class="input" type="tel" placeholder="请输入验证码" maxlength="4" v-model="code">
        <slot></slot>
    </div>

</template>

<script>
    export default {
        name: 'code_input',
        data () {
            return {
                code: '',
            }
        },
        watch: {
            code(val, old){
                if (val !== '') {
                    if (!/\d$/.test(val)) {
                        this.code = old;
                        return;
                    }
                }
                this.$store.commit('setCode', this.code);
            }
        }
    }
</script>

<style scoped>
    /*.input {*/
        /*height: inherit;*/
    /*}*/
</style>
