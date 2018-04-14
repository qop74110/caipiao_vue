<template>
  <div class="swiper-container autoHeight">
    <div class="swiper-wrapper autoHeight">
      <div class="swiper-slide autoHeight" v-for="(item,index) in list" :key="index"
           :style="'background-image: url('+item.img+')'">
        <a :href="item.link_url" class="link"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: 'Banner',
    props: {
      list: {
        type: Array,
        default () {
          return [
            {
              link_url: 'javascript:',
              img: 'http://or2eh71ll.bkt.clouddn.com/152151376692483.png',
            }, {
              link_url: 'javascript:',
              img: 'http://or2eh71ll.bkt.clouddn.com/152151376692483.png',
            }
          ]
        }
      },
    },
    data () {
      return {}
    },
    mounted() {
      new Swiper('.swiper-container', {
        speed: 600,
        loop: true,

        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
      });

    },
    created(){

    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  .autoHeight {
    height: inherit;
  }

  .swiper-slide {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .link{
    display: block;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
</style>
