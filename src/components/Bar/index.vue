<template>
  <div class="Bar" :style="'height:' + h + 'rem; line-height: ' + h + 'rem'">
    <div class="fl item" v-for="(item,index) in list"
         :style="'width:' + width + '%'"
         :key="index"
         :class="i === index && 's'"
         @click="i = index"

    >
      {{item}}
      <span v-if="index !== list.length - 1"

            class="fr item_lien"></span>
    </div>
    <div class="bar_line" :style="'width:' + width + '%; left: ' + i * width + '%' "></div>
  </div>
</template>

<script>
  export default {
    name: 'Bar',
    props: {
      list: {
        type: Array || Object,
        default(){
          return [
            "土豆",
            "辣椒",
            "茄子",
          ]
        }
      },
      h: {
        type: String,
        default: ".93",
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        i: 0,
        width: 0,
      }
    },
    created(){
      this.width = 100 / this.list.length;

    },
    methods: {},
    watch: {
      i(val){
        this.$emit("input", val)
      },
      value: {
        handler: function (val) {

          this.i = val
        },
        immediate: true
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
