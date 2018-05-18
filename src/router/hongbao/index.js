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
        // }, {
        //     path: '/hemai_detail',
        //     name: 'hemai_detail',
        //     meta: {
        //         title: '合买详情'
        //     },
        //     component: (resolve) => {
        //         require(['page/hemai/detail'], resolve)
        //     }
    },
]
