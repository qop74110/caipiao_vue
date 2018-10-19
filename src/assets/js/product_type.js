/**
 * Created by root on 2018/4/12.
 * 产品标示
 * 例：双色球     shuangseqiu = > 1;  1 => shuangseqiu
 */

const product_type = {
    shuangseqiu: "ssq",              //  双色球
    jingcaizuqiu: "ftb",             //  竞彩足球
    dlt: 'dlt',                      //  大乐透
    fucai3d: "3d",                   //  福彩3d
    p3: "p3",                        //  排列三
    p5: "p5",                        //  排列五
};

for (let k in product_type) {
    product_type[product_type[k]] = k;
}

export default product_type;
