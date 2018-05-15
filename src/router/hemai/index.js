/**
 *  合买路由
 */

export default [
    {
        path: '/hemai',
        name: 'hemai',
        meta: {
            title: '合买中心'
        },
        component: (resolve) => {
            require(['page/hemai/index'], resolve)
        }
    }, {
        path: '/hemai_detail',
        name: 'hemai_detail',
        meta: {
            title: '合买详情'
        },
        component: (resolve) => {
            require(['page/hemai/detail'], resolve)
        }
    },
]
