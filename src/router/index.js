import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: (resolve) => {
        require(['page/home/index'], resolve)
      }
    }, {
      path: "/my",
      name: "my",
      component: (resolve) => {
        require(["page/my/index"], resolve)
      }
    }, {
      path: "/prize",
      name: "prize",
      component: (resolve) => {
        require(["page/prize/index"], resolve)
      }
    }
  ]
})
