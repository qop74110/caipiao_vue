<template>
    <div class="XTitle">
        <div class="fixed">
            <div @click="$router.back()" class="back fl "></div>
            <div class="text fl " @click="showTitle = !showTitle" v-if="titleOption.length > 1">
                {{titleOption[activeTitle]}}
                <i class="arrow_b"></i>
            </div>
            <div class="text fl" v-else>{{titleOption[activeTitle]}}</div>
            <div class="more fr " @click="showMore = !showMore"></div>
        </div>


        <!--标题选项-->
        <Actionsheet v-model="showTitle" :show-cancel="true" :menus="titleOption"
                     @on-click-menu="setTitle"></Actionsheet>

        <!--更多选项-->
        <Actionsheet v-model="showMore" :show-cancel="true" :menus="moreOption"
                     @on-click-menu="MOcallback"></Actionsheet>
    </div>
</template>

<script>
    import {Actionsheet} from 'vux'
    export default {
        name: 'XTitle',
        props: {
            activeTitle: {
                type: Number,
                required : true
            },
            titleOption: {
                type: Array,
                required: true,
            },
            setTitle: {
                type: Function,
                required: true
            },
            moreOption: {
                type: Array,
                required: true,
            },
            MOcallback: {
                type: Function,
                required: true
            }
        },
        components: {
            Actionsheet
        },
        data () {
            return {
                showTitle: false,
                showMore: false
            }
        },
        created () {
        },
        methods: {}
    }
</script>


<style scoped lang="less" rel="stylesheet/less">
    @import "../../../pailie/com/title/title.less";
</style>
