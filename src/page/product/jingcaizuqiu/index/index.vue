<template>
  <div class="jczq_index page">
    <XHead @setMore="setMore" @setOption="setOption">{{title}}</XHead>

    <Actionsheet ></Actionsheet>
  </div>
</template>

<script>
  import {XHead,Actionsheet} from "com";
  export default {
    name: '',
    components: {
      XHead,
      Actionsheet
    },
    data () {
      return {
        title: "胜平负",
        show_title_option: false,
        show_more: false,
      }
    },
    created(){

    },
    methods: {
      setMore(val){
        this.show_more = val;
      },
      setOption(val){
        this.show_title_option = val;
      },
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
@import "./index.less";
</style>
