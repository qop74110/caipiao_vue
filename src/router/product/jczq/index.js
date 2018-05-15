/**
 * 竞猜足球
 */

export default  {
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
};
