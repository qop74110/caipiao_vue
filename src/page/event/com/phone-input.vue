<template>
    <div class="phone_input">
        <input class="input" type="tel" placeholder="请输入手机号" maxlength="11" v-model="phone">
    </div>
</template>

<script>
    export default {
        name: 'phone_input',
        data () {
            return {
                phone: '',
            }
        },
        watch: {
            phone(val, old){
                if (val !== '') {
                    if (!/\d$/.test(val)) {
                        this.phone = old;
                        return;
                    }
                }
                this.$store.commit('setPhone', this.phone);
            }
        }
    }
</script>


