<template>
    <div class="order_chase page">
        <order_list apiName="order_chase"></order_list>
    </div>
</template>

<script>
    import order_list from "../list"
    export default {
        name: 'order_chase',
        components: {
            order_list
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
</style>
