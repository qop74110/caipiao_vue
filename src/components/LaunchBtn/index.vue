<template>
    <div class="LaunchBtn" @click="fun(true)">
        发起合买
    </div>
</template>

<script>
    export default {
        name: 'LaunchBtn',
        props: {
            fun: {
                type: Function,
                default(){
                    alert('没传——FUN')
                }
            }
        },
        data () {
            return {}
        },
        created(){

        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    .LaunchBtn {
        position: absolute;
        top: 0;
        right: .3rem;
        height: inherit;
        line-height: inherit;
        color: white;
        font-size: .42rem;
    }
</style>
