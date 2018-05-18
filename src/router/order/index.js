/**
 *  订单路由
 */

export default [
    {
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
            }, {
                path: "detail_tow",
                name: "order_detail_tow",
                meta: {
                    title: '订单详情'
                },
                component: (resolve) => {
                    require(["page/order/detail_two"], resolve)
                }
            }, {
                path: "hemai",
                name: "order_hemai",
                meta: {
                    title: '订单详情'
                },
                component: (resolve) => {
                    require(["page/order/hemai/index1.vue"], resolve)
                }
            }
        ]
    }
]
