/**
 * 福彩3d
 */

export default [
    {
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
    }
]
