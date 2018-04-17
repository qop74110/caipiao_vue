<template>
  <div class="XHead">
    <div class="fl back w20" @click="$router.back()"></div>
    <div class="title fl hideText" @click="a_t = !a_t">
      <slot></slot>
      <i class="title_option" v-if="show_title_option" ></i>
    </div>
    <div class="more fl w20" v-if="show_mord" @click="a_m = !a_m"></div>
  </div>
</template>

<script>
  export default {
    name: 'XHead',
    props: {
      show_mord: {
        type: Boolean,
        default: true
      },
      show_title_option: {
        type: Boolean,
        default: true,
      },
      active_more: {
        type: Boolean,
        default: false
      },
      active_title: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        a_t: false,
        a_m: false,
      }
    },
    created(){
      this.a_t = this.active_title;
      this.a_m = this.active_more;
    },
    methods: {},
    watch: {
      active_title(val){
        this.a_t = val;
      },
      active_more(val){
        this.a_m = val
      },
      a_t(val){
        this.$emit("setOption", val);
      },
      a_m(val){
        this.$emit("setMore", val);
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
