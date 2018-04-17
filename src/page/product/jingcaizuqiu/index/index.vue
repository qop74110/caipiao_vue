<template>
  <div class="jczq_index page">
    <XHead @setMore="setMore" @setOption="setOption">{{title}}</XHead>
  </div>
</template>

<script>
  import {XHead} from "com";
  export default {
    name: '',
    components: {
      XHead
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
        console.log(this.show_more)
      },
      setOption(val){
        this.show_title_option = val;
        console.log(this.show_title_option)
      },
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">

</style>
