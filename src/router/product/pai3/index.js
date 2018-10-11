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
        },
    }
]
