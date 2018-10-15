/**
 * 排列三
 */

export default [
    {
        path: "/p3/index",
        meta: {
            title: '排列3',
        },
        name: 'pai3',
        component: (resolve) => {
            require(["page/product/pailie/index/p3"], resolve)
        }
    }, {
        path: "/p5/index",
        meta: {
            title: '排列5',
        },
        name: 'pai5',
        component: (resolve) => {
            require(["page/product/pailie/index/p5"], resolve)
        }
    }, {
        path: "/order/:playType",
        meta: {
            title: '订单',
        },
        name: 'paiOrder',
        component: (resolve) => {
            require(["page/product/pailie/order/order"], resolve)
        }
    }
]
