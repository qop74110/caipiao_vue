/**
 * Created by root on 2018/4/12.
 * 产品标示
 * 例：双色球     shuangseqiu = > 1;  1 => shuangseqiu
 */

const product_type = {
  shuangseqiu: 1,           //  双色球
  jingcaizuqiu: 2           //  竞彩足球
};

for (let k in product_type) {
  product_type[product_type[k]] = k;
}

export default product_type;
