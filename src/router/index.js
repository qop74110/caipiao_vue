import Vue from 'vue'
import Router from 'vue-router'

// 路由
import hemai from "./hemai";
import order from "./order";
import prize from "./prize";
import caizhong from "./product";
import my from "./my";
import pay from "./pay";
import hongbao from "./hongbao";

Vue.use(Router);

const routes = [...hemai, ...order, ...prize, ...caizhong, ...my, ...pay, ...hongbao];

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
        path: "/zst/:type",
        name: "zst",
        meta: {
            title: '走势图'
        },
        component: (resolve) => {
            require(["page/zst"], resolve)
        }
    }, {
        path: "/download",
        name: "download",
        meta: {
            title: '下载'
        },
        component: (resolve) => {
            require(["page/download"], resolve)
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
        path: "/service",
        name: "service",
        meta: {
            title: '服务协议'
        },
        component: (resolve) => {
            require(["page/service"], resolve)
        }
    }, {
        path: "/about",
        name: "about",
        meta: {
            title: '关于'
        },
        component: (resolve) => {
            require(["page/service/about.vue"], resolve)
        }
    }, {
        path: '*',
        redirect: '/nofund'
    }
);

export default new Router({
    routes
})
