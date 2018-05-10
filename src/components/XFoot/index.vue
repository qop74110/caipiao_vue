<template>
    <div class="XFoot">
        <span class="text">{{zhushu}} 注 共 <span class="redText">{{zhushu * 2}}</span>元</span>
        <span class="submit fr redBg btn_active" @click="submit">确定</span>
        <div class="clear fl" @click="clear_checked">清空</div>

    </div>
</template>

<script>
    export default {
        name: 'XFoot',
        props: {
            zhushu: {
                type: Number,
                default: 0
            },
        },
        data () {
            return {}
        },
        created(){

        },
        methods: {
            clear_checked(){
                this.$emit('clearChecked');
            },
            submit(){
                this.$emit('submit');
            }
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "./index.less";
</style>
