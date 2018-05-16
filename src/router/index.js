import Vue from 'vue'
import Router from 'vue-router'

// 路由
import hemai from "./hemai";
import order from "./order";
import prize from "./prize";
import caizhong from "./product";
import my from "./my";
import pay from "./pay";

Vue.use(Router);

const routes = [...hemai,...order,...prize,...caizhong,...my, ...pay];

routes.push(
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
        path: "/login",
        name: "login",
        meta: {
            title: '用户登录'
        },
        component: (resolve) => {
            require(["page/login/index/index.vue"], resolve)
        }
    }, {
        path: "/nofund",
        name: "nofund",
        meta: {
            title: '404'
        },
        component: (resolve) => {
            require(["page/nofund"], resolve)
        }
    }, {
        path: '*',
        redirect: '/nofund'
    }
);

export default new Router({
    routes
})
