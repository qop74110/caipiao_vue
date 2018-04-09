<template>
  <div class="swiper-container autoHeight">
    <div class="swiper-wrapper autoHeight">
      <div class="swiper-slide autoHeight" v-for="(item,index) in list" :key="index"
           :style="'background-image: url('+item.img+')'"></div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'Banner',
    data () {
      return {
        list: [
          {
            url: 'javascript:',
            img: 'http://or2eh71ll.bkt.clouddn.com/152151376692483.png',
          }, {
            url: 'javascript:',
            img: 'http://or2eh71ll.bkt.clouddn.com/152151376692483.png',
          }
        ],

      }
    },
    mounted() {
      console.log('mounted', this)
      var swiper = new Swiper('.swiper-container', {
        speed: 600,
        loop: true,

        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
      });
    },
    created(){
      this.mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,

      })
    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  .autoHeight{
    height: inherit;
  }
  .swiper-slide {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
