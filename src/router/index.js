import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '购彩中心'
      },
      component: (resolve) => {
        require(['page/home/index'], resolve)
      }
    }, {
      path: "/my",
      name: "my",
      meta: {
        title: '我的'
      },
      component: (resolve) => {
        require(["page/my/index"], resolve)
      }
    }, {
      path: "/prize",
      name: "prize",
      meta: {
        title: '开奖信息'
      },
      component: (resolve) => {
        require(["page/prize/index"], resolve)
      }
    }, {
      path: "/login",
      name: "login",
      meta: {
        title: '用户登录'
      },
      component: (resolve) => {
        require(["page/login/index/index.vue"], resolve)
      }
    }, {
      path: "/set",
      name: "set",
      meta: {
        title: '设置'
      },
      component: (resolve) => {
        require(["page/my/set"], resolve)
      }
    }, {
      path: "/shuangseqiu",
      component: (resolve) => {
        require(["page/product/shuangseqiu"], resolve)
      },

      children: [
        {
          path: "index",
          name: "shuangseqiu",
          meta: {
            title: '双色球'
          },
          component: (resolve) => {
            require(["page/product/shuangseqiu/index/index.vue"], resolve)
          }
        }, {
          path: "exposition",
          name: "exposition",
          meta: {
            title: '玩法说明'
          },
          component: (resolve) => {
            require(["page/product/shuangseqiu/exposition"], resolve)
          }
        }, {
          path: '*',
          redirect: 'index'
        },

      ]

    }
  ]
})
