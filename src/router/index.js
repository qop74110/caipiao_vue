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
            path: "/recharge",
            name: "recharge",
            meta: {
                title: '充值'
            },
            component: (resolve) => {
                require(["page/my/recharge"], resolve)
            }
        }, {
            path: "/tixian",
            name: "tixian",
            meta: {
                title: '提现'
            },
            component: (resolve) => {
                require(["page/my/tixian"], resolve)
            }
        }, {
            path: "/bindID",
            name: "bindID",
            meta: {
                title: '身份验证'
            },
            component: (resolve) => {
                require(["page/my/bindID"], resolve)
            }
        }, {
            path: "/order",
            name: "Order",
            meta: {
                title: '我的订单'
            },
            component: (resolve) => {
                require(["page/order/"], resolve)
            },
            children: [
                {
                    path: "all",
                    name: "order_all",
                    meta: {
                        title: '全部订单'
                    },
                    component: (resolve) => {
                        require(["page/order/all"], resolve)
                    }
                }, {
                    path: "ing",
                    name: "order_ing",
                    meta: {
                        title: '待开奖订单'
                    },
                    component: (resolve) => {
                        require(["page/order/ing"], resolve)
                    }
                }, {
                    path: "prize",
                    name: "order_prize",
                    meta: {
                        title: '中将订单'
                    },
                    component: (resolve) => {
                        require(["page/order/prize"], resolve)
                    }
                }, {
                    path: "chase",
                    name: "order_chase",
                    meta: {
                        title: '追号订单'
                    },
                    component: (resolve) => {
                        require(["page/order/chase"], resolve)
                    }
                }, {
                    path: "detail",
                    name: "order_detail",
                    meta: {
                        title: '订单详情'
                    },
                    component: (resolve) => {
                        require(["page/order/detail"], resolve)
                    }
                }
            ]
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
            path: "/prize_ssq",
            name: "prize_ssq",
            meta: {
                title: '双色球'
            },
            component: (resolve) => {
                require(["page/prize/shuangseqiu"], resolve)
            }
        }, {
            path: "/prize_jczq",
            name: "prize_jczq",
            meta: {
                title: '竞彩足球'
            },
            component: (resolve) => {
                require(["page/prize/jingcaizuqiu"], resolve)
            }
        }, {
            path: "/prize_fc3d",
            name: "prize_fc3d",
            meta: {
                title: '福彩3D'
            },
            component: (resolve) => {
                require(["page/prize/fucai3d"], resolve)
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
                    path: "random",
                    name: "random",
                    meta: {
                        title: '多期机选'
                    },
                    component: (resolve) => {
                        require(["page/product/shuangseqiu/random"], resolve)
                    }
                }, {
                    path: "order",
                    meta: {
                        title: '双色球'
                    },
                    component: (resolve) => {
                        require(["page/product/shuangseqiu/order"], resolve)
                    }
                }
            ]
        }, {
            path: "/jingcaizuqiu",
            component: (resolve) => {
                require(["page/product/jingcaizuqiu"], resolve)
            },
            children: [
                {
                    path: "index",
                    name: "jingcaizuqiu",
                    meta: {
                        title: '竞彩足球'
                    },
                    component: (resolve) => {
                        require(["page/product/jingcaizuqiu/index/index.vue"], resolve)
                    }
                }, {
                    path: "order",
                    meta: {
                        title: '竞彩足球'
                    },
                    component: (resolve) => {
                        require(["page/product/jingcaizuqiu/order"], resolve)
                    }
                }, {
                    path: '*',
                    redirect: '/nofund'
                },
            ]
        }, {
            path: "/fucai3d/index",
            meta: {
                title: '福彩3d',
            },
            name: 'fucai3d_index',
            component: (resolve) => {
                require(["page/product/fucai3d/index"], resolve)
            },
        }, {
            path: "/fucai3d/order",
            meta: {
                title: '福彩3d',
            },
            name: 'fucai3d_order',
            component: (resolve) => {
                require(["page/product/fucai3d/order"], resolve)
            },
        }, {
            path: "/exposition",
            name: "exposition",
            meta: {
                title: '玩法说明'
            },
            component: (resolve) => {
                require(["page/product/exposition"], resolve)
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
        },
    ]
})
