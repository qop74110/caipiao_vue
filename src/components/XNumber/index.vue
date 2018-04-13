<template>
  <ul class="XNumber fl clearFix" :style="`height: ${h}rem; line-height: cale(${h}rem - 2px)`">
    <li class="fl bor_r w8 ccc btn_active" @click="sub">-</li>
    <li class="fl bor_r ">
      <input class="input" type="tel" @focus="focus" @blur="blur" v-model="val" :style="`width: ${input_w}rem`">
    </li>
    <li class="fl w8 ccc btn_active" @click="add">+</li>
  </ul>
</template>

<script>

  import {XNumber} from 'vux'
  export default {
    name: 'XNumber',
    props: {
      h: {
        type: Number,
        default: .6,
      },
      _val: {
        type: Number,
        default: 1,
      },
      min_val: {
        type: Number,
        default: 1,
      },
      max_val: {
        type: Number,
        default: 15,
      },
      input_w: {
        type: Number,
        default: 2.2,
      },
    },
    data () {
      return {
        val: this._val,
      }
    },
    created(){
    },
    methods: {
      sub(){
        --this.val
      },
      add(){
        ++this.val;
      },
      focus(){
        this.val = "";
      },
      blur(){
        this.val === "" && (this.val = this.min_val)
      },
    },
    watch: {
      val(val){
        if (val !== "") {
          if (val < this.min_val) {
            this.val = this.min_val;
          } else if (val > this.max_val) {
            this.val = this.max_val;
          }
        }
        this.$emit("on-change", this.val);
      }
    },
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
