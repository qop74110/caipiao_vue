<template>
  <div class="Actionsheet" v-show="show" @click="show = false">

    <ul class="list">
      <li class="item" v-for="(item, key) in list" @click="click_item(key)">{{item}}</li>
      <li class="item cancel" @click="click_item('-1')">取消</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Actionsheet',
    props: {
      list: {
        type: Object,
        default() {
          return {
            "0": "土豆",
            "1": "茄子",
            "2": "辣椒"
          }
        }
      },
      value: Boolean,
    },
    data () {
      return {
        show: true,
      }
    },
    created(){
    },
    methods: {
      click_item(key){
        this.$emit('click_item', key)
      }
    },
    watch: {
      show(val){
        this.$emit('input', val)
      },
      value: {
        handler: function (val) {

          this.show = val
        },
        immediate: true
      }
    }
  }

</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
