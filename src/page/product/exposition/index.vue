<template>
  <div class="exposition">
    <img :src="`./static/img/ex_${id}.jpeg`" class="img">
  </div>
</template>

<script>
  export default {
    name: 'exposition',
    data () {
      return {
        id: this.global.product_type[this.$route.query.id || "1"],
      }
    },
    created(){


    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "index.less";
</style>
