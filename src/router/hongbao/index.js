/**
 *  红包-路由
 */

export default [
    {
        path: '/hongbao',
        name: 'hongbao',
        meta: {
            title: '红包'
        },
        component: (resolve) => {
            require(['page/hongbao/index'], resolve)
        }
        }, {
            path: '/hb_help',
            name: 'hb_help',
            meta: {
                title: '红包/兑换说明'
            },
            component: (resolve) => {
                require(['page/hongbao/help'], resolve)
            }
    },
]
