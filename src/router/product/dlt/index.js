/**
 * 大乐透
 */

export default [
    {
        path: "/dlt/index",
        meta: {
            title: '大乐透',
        },
        name: 'dltIndex',
        component: (resolve) => {
            require(["page/product/daletou/index/index.vue"], resolve)
        },
    }, {
        path: "/dlt/order",
        meta: {
            title: '大乐透',
        },
        name: 'dltOrder',
        component: (resolve) => {
            require(["page/product/daletou/order/order.vue"], resolve)
        },
    }, {
        path: "/dlt/random",
        name: "dltRandom",
        meta: {
            title: '多期机选'
        },
        component: (resolve) => {
            require(["page/product/daletou/random/random.vue"], resolve)
        }
    }
]
