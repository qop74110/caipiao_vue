/**
 * 双色球
 */

export default {
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
};
